
import fetch from "node-fetch";
import passport from "passport";
import GitHubStrategy from "passport-github2";
import local from "passport-local";
import { createHash, isValidPassword } from '../config.js';
import { logger } from "../utils/logger.js";
import { userMongoose } from "../DAO/mongo/models/users.mongoose.js";
import { userService } from "../services/user.service.js";
import { cartService } from "../services/cart.service.js";
import { generateCartId } from "../utils/logger.js";
const LocalStrategy = local.Strategy;

export function iniPassport() {
	passport.use(
		"login",
		new LocalStrategy({ usernameField: "email", passReqToCallback: true }, async (req, username, password, done) => {
			try {
				const user = await userService.getUser(username);

				if (!isValidPassword(password, user.password)) {
					console.log('Invalid Password');
					return done(null, false);
				} else {
					logger.info("User login succefull!");
				}

				return done(null, user);
			} catch (err) {
				return done(err);
			}
		})
	);

	passport.use(
		"register",
		new LocalStrategy(
			{
				passReqToCallback: true,
				usernameField: "email",
			},
			async (req, username, password, done) => {
				try {
					const { age, email, firstName, lastName, role } = req.body;
					const user = await userService.getUser(username);
					if (user) {
						console.log('User already exists');
						return done(null, false);
					} 
					
					if (!password) {
							throw new Error('No password provided');
						} 

					const newUser = {
						age,
						email,
						firstName,
						lastName,
						password: createHash(password),
						cartID: generateCartId(),
						role,
					};

					const products = {};

					try {
						const userCreated = await userService.createUser(newUser);

						if (!userCreated) {
							return done(null, false);
						}else {
							logger.info("User registrarion succesfully!");
						}

						try {
							const cart = await cartService.createCart(products);
							userCreated.cartID = cart;
							await userCreated.save();
						} catch (error) {
							console.log('Error actualizando el carrito:', error);
							return done(error);
						}

						return done(null, userCreated);
					} catch (error) {
						console.log('Error creando el usuario:', error);
						return done(error);
					}

					return done(null, userCreated);
				} catch (e) {
					logger.error("Error in register");
					return done(e);
				}
			}
		)
	);

	passport.use(
		"github",
		new GitHubStrategy(
			{
				clientID: process.env.GITHUB_CLIENT_ID,
				clientSecret: process.env.GITHUB_CLIENT_SECRET,
				callbackURL: "http://localhost:8080/api/sessions/githubcallback",
			},
			async (accesToken, _, profile, done) => {
				try {
					const res = await fetch("https://api.github.com/user/emails", {
						headers: {
							Accept: "application/vnd.github+json",
							Authorization: "Bearer " + accesToken,
							"X-Github-Api-Version": "2022-11-28",
						},
					});
					const emails = await res.json();
					const emailDetail = emails.find(email => email.verified == true);

					if (!emailDetail) {
						return done(new Error("cannot get a valid email for this user"));
					}
					profile.email = emailDetail.email;

					let user = await userMongoose.findOne({ email: profile.email });
					if (!user) {
						const newUser = {
							email: profile.email,
							firstName: profile._json.name || profile._json.login || "noname",
							role: "user",
							password: "nopass",
						};
						let userCreated = await userMongoose.create(newUser);
						logger.info("User Registration succesful");
						return done(null, userCreated);
					} else {
						logger.error("User already exists");
						return done(null, user);
					}
				} catch (e) {
					logger.error("Error en auth github");
					return done(e);
				}
			}
		)
	);

	passport.serializeUser((user, done) => {
		done(null, user._id);
	});

	passport.deserializeUser(async (id, done) => {
		let user = await userMongoose.findById(id);
		done(null, user);
	});
}
