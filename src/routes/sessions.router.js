import express from 'express';
import passport from 'passport';
// import UserDTO from '../DTO/user.dto.js';
import { sessionsController } from '../controllers/session.controller.js';
export const sessionsRouter = express.Router();

sessionsRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

sessionsRouter.get(
  '/githubcallback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    req.session.user = req.user;
    // Successful authentication, redirect products.
    res.redirect('/products');
  }
);

sessionsRouter.get("/current", sessionsController.currentSession);

// sessionsRouter.get("/current", sessionsController.session);
