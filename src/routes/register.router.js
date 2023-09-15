import express from 'express';
import passport from 'passport';

export const registerRouter = express.Router();

registerRouter.get('/', (req, res) => {
  res.render('register');
});

registerRouter.post(
  '/',
  passport.authenticate('register', { failureRedirect: '/register/failregister' }),
  (req, res) => {
    if (!req.user) {
      return res.status(400).render('error', { msg: 'User already registered' });
    }
    req.session.user = {
      _id: req.user._id,
      age: req.user.age,
      cartID: req.user.cartID,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      role: req.user.role,
    };

    return res.status(201).render('success-login');
  }
);

registerRouter.get('/failregister', async (req, res) => {
  return res.status(400).render('error', { msg: 'Controla tu email e intenta más tarde' });
});
