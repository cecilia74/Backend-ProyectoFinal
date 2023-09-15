import { cartService } from '../services/cart.service.js';


class CartsController {
  getAllCarts = async (req, res) => {
    try {
      const carts = await cartService.getAllCarts();
      res.status(200).json(carts);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  getCart = async (req, res) => {
    try {
      const cartId = req.params.cid;
      const user = req.session.user.firstName;
      const role = req.session.user.role;

      const cart = await cartService.getCart(cartId);

      const plainCart = cart.products.map(cart => cart.toObject());

      if (cart) {
        res.status(200).render('carts', { plainCart, cartId: [cartId], user, role });
      } else {
        res.status(404).json({ message: `Carrito ${cartId} no encontrado` });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  createCart = async (req, res) => {
    try {
      const products = req.body;
      const newCart = await cartService.createCart(products);
      res.status(201).json(newCart);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  addToCart = async (req, res) => {
    try {
      const cartId = req.params.cid;
      const products = req.body;
      const cart = await cartService.addToCart(cartId, products);
      res.status(201).json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  addProductToCart = async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const cart = await cartService.addProductToCart(cid, pid);
      res.status(201).json(cart);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };

  deleteProduct = async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const cart = await cartService.deleteProduct(cid, pid);
      res.status(200).json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  };

  deleteCart = async (req, res) => {
    try {
      const cid = req.params.cid;
      await cartService.deleteCart(cid);
      res.status(200).json({ status: 'success', message: 'Cart cleared successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  };
}





export const cartsController = new CartsController();
