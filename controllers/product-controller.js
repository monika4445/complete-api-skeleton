const productService = require('../services/product-service');

const productController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await productService.getAllProducts(req, res);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  getProductById: async (req, res) => {
    const id = req.params.id;
    try {
      const product = await productService.getProductById(id);
      if (!product) {
        res.status(404).send('Product not found');
      } else {
        res.status(200).json(product);
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  createProduct: async (req, res) => {
    const { name, description, price, image } = req.body;
    
    if (!name || !description || !price || !image ) {
        res.status(400).send('Please provide all required fields.');
        return;
      }
    try {
      const product = await productService.createProduct(name, description, price, image);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  updateProductById: async (req, res) => {
    const id = req.params.id;
    const { name, price, description } = req.body;
    try {
      const product = await productService.updateProductById(id, name, price, description);
      if (!product) {
        res.status(404).send('Product not found');
      } else {
        res.status(200).json(product);
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  deleteProductById: async (req, res) => {
    const id = req.params.id;
    try {
      const product = await productService.deleteProductById(id);
      if (!product) {
        res.status(404).send('Product not found');
      } else {
        res.status(200).send('Product deleted successfully');
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};

module.exports = productController;
