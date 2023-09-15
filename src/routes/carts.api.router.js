import express from 'express';
import { cartsController } from '../controllers/carts.controller.js';
export const cartsApiRouter = express.Router();

// GET /

cartsApiRouter.get('/', cartsController.getAllCarts);