import { CartsMongoose } from './models/carts.mongoose.js';
import { ProductsMongoose } from './models/products.mongoose.js';
import { logger } from '../../utils/logger.js';

class CartModel {
  async getAllCarts() {
    try {
      const carts = await CartsMongoose.find({}).exec();
      return carts;
    } catch (error) {
      throw new Error('Error al obtener los carritos');
    }
  }

  async getCart(cartId) {
    try {
 
        const cart = await CartsMongoose.findOne({ cartID: cartId }).exec();
        const carti = await CartsMongoose.find(cart => cart.id === _id)
        return cart;
    } catch (error) {
      throw new Error('Error al obtener el carrito');
    }
  }

  async createCart(products) {
    try {
      const cart = await CartsMongoose.create(products);
      const cartId = cart.toObject();
      const cartIdString = cartId._id.toString();

      return cartIdString;
    } catch (error) {
      throw new Error('Error al crear el carrito');
    }
  }

  async addToCart(cartId, products) {
    try {
      const cart = await CartsMongoose.findByIdAndUpdate({ cartID: cartId }, { products }, { new: true }).exec();

      return cart;
    } catch (error) {
      throw new Error('Error al actualizar el carrito');
    }
  }

  async addProductToCart(cartId, productId) {
    try {
      const cart = await CartsMongoose.findById({ cartID: cartId }).exec();
      const product = await ProductsMongoose.findById(productId).exec();

      if (!cart) {
        throw new Error('Cart not found');
      }
      if (!product) {
        throw new Error('Product not found');
      }

      const productIndex = cart.products.findIndex(p => {
        const product = p.product.toObject();
        const productString = product._id.toString();

        return productString === productId;
      });

      if (productIndex === -1) {
        cart.products.push({ product: product._id, quantity: 1 });
        await cart.save();
      } else {
        cart.products[productIndex].quantity += 1;
        await cart.save();
      }

      return cart;
    } catch (error) {
      throw new Error('Error al agregar producto');
    }
  }

  async deleteProduct(cartId, productId) {
    try {
      const cart = await CartsMongoose.findById({ cartID: cartId }).exec();
      const productIndex = cart.products.findIndex(p => {
        const product = p.product.toObject();
        const productString = product._id.toString();

        return productString === productId;
      });

      if (productIndex === -1) {
        throw new Error('Product not found in cart');
      }

      cart.products.splice(productIndex, 1);
      await cart.save();

      return cart;
    } catch (error) {
      throw new Error('Error removing product from cart');
    }
  }

  async deleteCart(cartId) {
    try {
      const cart = await CartsMongoose.findById({ cartID: cartId }).exec();
      cart.products = [];
      await cart.save();
    } catch (error) {
      throw new Error('Error clearing cart');
    }
  }
}

export const cartModel =new CartModel();

