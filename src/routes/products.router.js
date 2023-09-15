import express from 'express';
import { productsController } from '../controllers/products.controller.js';
import { isUser } from '../middlewares/auth.js';

export const products = express.Router();

// GET con limit

products.get('/', isUser, productsController.getAll);

// GET por ID

products.get('/:pid', isUser, productsController.getById);
