import express from 'express';
import { productsController } from '../controllers/products.controller.js';
import { isAdmin } from '../middlewares/auth.js';

export const realTimeProducts = express.Router();

// GET con limit

realTimeProducts.get('/', isAdmin, productsController.getAllInRealTime);

// GET por ID

realTimeProducts.get('/:pid', isAdmin, productsController.getByIdInRealTime);
