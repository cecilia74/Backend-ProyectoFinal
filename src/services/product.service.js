import importModels from '../DAO/factory.js';

const models = await importModels();

const productsModel = models.products;
class ProductService {
  async getAll(queryParams) {
    return productsModel.getAll(queryParams);
  }

  async getJson(queryParams) {
    return productsModel.getJson(queryParams);
  }

  async getAllProducts() {
    return productsModel.getAllProducts();
  }

  async getById(productId) {
    return productsModel.getById(productId);
  }

  async createProduct(newProd) {
    return productsModel.createProduct(newProd);
  }

  async deleteProduct(productId) {
    return productsModel.deleteProduct(productId);
  }
}

export const productService = new ProductService();
