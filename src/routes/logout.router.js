import express from 'express';
import { isUser } from '../middlewares/auth.js';

export const logoutRouter = express.Router();

logoutRouter.get('/', isUser, (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).render('error', { msg: 'No se pudo cerrar la sessión' });
    }
    return res.redirect('/');
  });
});
