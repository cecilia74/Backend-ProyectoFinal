import { productService } from '../services/product.service.js';

class ProductsController {
  getAll = async (req, res) => {
    try {
      const queryParams = req.query;
      const user = req.session.user.firstName;
      const role = req.session.user.role;

      const paginatedProductsResponse = await productService.getAll(queryParams);
      const paginatedProducts = paginatedProductsResponse.modifiedProducts;
      const paginated = paginatedProductsResponse.products;
      res
        .status(200)
        .render('products', { products: paginatedProducts, paginated: paginated, user, role });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  getById = async (req, res) => {
    try {
      const id = req.params.pid;
      const productById = await productService.getById(id);

      if (productById) {
        res.status(200).render('products', { productById: [productById] });
      } else {
        res.status(404).json({ message: 'Producto no encontrado' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  getJson = async (req, res) => {
    try {
      const queryParams = req.query;

      const products = await productService.getJson(queryParams);
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  getJsonById = async (req, res) => {
    try {
      const queryParams = req.query;

      const products = await productService.getById(queryParams);
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  getAllInRealTime = async (req, res) => {
    try {
      const queryParams = req.query;
      const user = req.session.user.firstName;
      const role = req.session.user.role;

      const paginatedProductsResponse = await productService.getAll(queryParams);
      const paginatedProducts = paginatedProductsResponse.modifiedProducts;
      const paginated = paginatedProductsResponse.products;

      res.status(200).render('realtimeproducts', {
        products: paginatedProducts,
        paginated: paginated,
        user,
        role,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  getByIdInRealTime = async (req, res) => {
    try {
      const id = req.params.pid;
      const productById = await productService.getById(id);

      if (productById) {
        res.status(200).render('realtimeproducts', { productById: [productById] });
      } else {
        res.status(404).json({ message: 'Producto no encontrado' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
}

export const productsController = new ProductsController();
