import express from 'express';
import { isUser } from '../middlewares/auth.js';

export const testChatRouter = express.Router();

testChatRouter.get('/', isUser, (req, res) => {
  const user = req.session.user.firstName;
  const role = req.session.user.role;

  return res.status(200).render('test-chat', { user, role });
});

