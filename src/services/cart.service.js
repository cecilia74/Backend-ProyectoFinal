import importModels from '../DAO/factory.js';

const models = await importModels();
const cartsModel = models.carts;
class CartService {
  async getAllCarts() {
    return cartsModel.getAllCarts();
  }

  async createCart(products) {
    return cartsModel.createCart(products);
  }

  async getCart(cartID) {
    return cartsModel.getCart(cartID);
  }

  async addToCart(cartId, products) {
    return cartsModel.addToCart(cartId, products);
  }

  async addProductToCart(cartId, productId) {
    return cartsModel.addProductToCart(cartId, productId);
  }

  async deleteProduct(cartId, productId) {
    return cartsModel.deleteProduct(cartId, productId);
  }

  async deleteCart(cartId) {
    return cartsModel.deleteCart(cartId);
  }
}



export const cartService = new CartService();
