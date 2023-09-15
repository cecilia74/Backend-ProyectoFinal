import express from 'express';
import { cartsController } from '../controllers/carts.controller.js';
import { isUser } from '../middlewares/auth.js';

export const cartsRouter = express.Router();

// GET /:cid

cartsRouter.get('/:cid', isUser, cartsController.getCart);

// POST

cartsRouter.post('/', isUser, cartsController.createCart);

// POST /:cid

cartsRouter.post('/:cid', isUser, cartsController.addToCart);

// PUT /:cid/product/:pid

cartsRouter.put('/:cid/product/:pid', isUser, cartsController.addProductToCart);

// DELETE /:cid/product/:pid

cartsRouter.delete('/:cid/product/:pid', isUser, cartsController.deleteProduct);

// DELETE /:cid

cartsRouter.delete('/:cid', isUser, cartsController.deleteCart);


