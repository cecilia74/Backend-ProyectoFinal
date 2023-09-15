import MongoStore from 'connect-mongo';
import express from 'express';
import handlebars from 'express-handlebars';
import session from 'express-session';
import passport from 'passport';
import path from 'path';
import { __dirname } from './config.js';
import { iniPassport } from './config/passport.config.js';
import { cartsApiRouter } from './routes/carts.api.router.js';
import { cartsRouter } from './routes/carts.router.js';
import { initRouter } from './routes/init.router.js';
import { loginRouter } from './routes/login.router.js';
import { logoutRouter } from './routes/logout.router.js';
import { productsApiRouter } from './routes/products.api.router.js';
import { products } from './routes/products.router.js';
import { realTimeProducts } from './routes/realtimeproducts.router.js';
import { registerRouter } from './routes/register.router.js';
import { sessionsRouter } from './routes/sessions.router.js';
import { testChatRouter } from './routes/chat.router.js';
import { connectMongo } from './utils/dbConnection.js';
import { connectSocketServer } from './utils/socketServer.js';
import cookieParser from 'cookie-parser';
import env from "./config/enviroment.js";

console.log(process.env.PORT);
console.log(process.env.ADMIN_PASSWORD);
console.log(process.env.MONGO_URL);
console.log(process.env.ADMIN_NAME);


const app = express();
const PORT = env.port;

connectMongo();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

// CONFIG DEL MOTOR DE PLANTILLAS
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

const httpServer = app.listen(PORT, () => {
  console.log(`App runing on ${__dirname} - server http://localhost:${PORT}`);
});

connectSocketServer(httpServer);

app.use(
  session({
    store: MongoStore.create({
      mongoUrl:env.mongoUrl,
      ttl: 86400 * 7,
    }),
    secret: 'asdmsOAMSimaioMSAOidAi21o3m',
    resave: true,
    saveUninitialized: true,
  })
);
app.get('/session', (req, res) => {
  if (req.session?.cont) {
    req.session.cont++;
    res.send(JSON.stringify(req.session));
  } else {
    req.session.cont = 1;
    res.send(JSON.stringify(req.session));
  }
});

iniPassport();
app.use(passport.initialize());
app.use(passport.session());

app.use("/hola",(req,res) => {
  const resultado = operacionCompleja();
  return res.json(resultado)
})

function operacionCompleja() {
  let result = 0;
  for (let i = 0; i < 5e9; i++) {
    result += i;
  }
  return result;
}
//TODOS MIS ENDPOINTS
app.use('/', initRouter);
app.use('/api/carts', cartsApiRouter);
app.use('/api/products', productsApiRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/carts', cartsRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/products', products);
app.use('/realtimeproducts', realTimeProducts);
app.use('/register', registerRouter);
app.use('/test-chat', testChatRouter);
app.get(
  "/api/sessions/github",
  passport.authenticate("github", { scope: ["user:email"] }),
);
app.get(
  "/api/sessions/githubcallback",
  passport.authenticate("github", { failureRedirect: "/error" }),
  (req, res) => {
    req.session.user = {
      firstName: req.user.firstName,
      cartID: req.user.cartId,
      role: req.user.role,
    };
    res.redirect("/");
  },
);

// app.get('/api/sessions/current', (req, res) => {
//   // Generate a session ID (you can use a library like `uuid` for this)
//   const sessionId = cartId;
  
//   // Set the session ID as a cookie
//   res.cookie(cartId, sessionId, { httpOnly: true });
//   console.log(sessionId)
//   res.send('Session ID set in cookie.');
// });


//OTROS ENDPOINTS
app.get('*', (req, res) => {
  return res.status(404).json({ status: 'error', msg: 'No se encuentra esa ruta', data: {} });
});
