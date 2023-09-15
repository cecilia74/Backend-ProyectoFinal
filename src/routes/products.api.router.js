import express from 'express';
import { productsController } from '../controllers/products.controller.js';
import { isUser } from '../middlewares/auth.js';

export const productsApiRouter = express.Router();

// GET con limit

productsApiRouter.get('/', isUser, productsController.getJson);

// GET por ID
isUser
productsApiRouter.get('/:pid', isUser, productsController.getJsonById);
