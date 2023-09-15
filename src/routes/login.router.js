import express from 'express';
import passport from 'passport';

export const loginRouter = express.Router();

loginRouter.post(
  '/',
  passport.authenticate('login', { failureRedirect: '/login/faillogin' }),
  async (req, res) => {
    if (!req.user) {
      return res.status(400).render('error', { msg: 'Datos incorrectos' });
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
console.log(req.session.user.cartID)
    return res.redirect('/products');
  }
);

loginRouter.get("/",async (req, res) => {
req.session.user = {
  _id: req.user._id,
  age: req.user.age,
  cartID: req.user.cartID,
  email: req.user.email,
  firstName: req.user.firstName,
  lastName: req.user.lastName,
  role: req.user.role,
}
console.log(req.session.user.email)
return res.send(req.session.user)
}

);

loginRouter.get('/faillogin', async (req, res) => {
  return res.status(500).render('error', { msg: 'Error inesperado en servidor' });
});
