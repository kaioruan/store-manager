const productsServices = require('../services/productsServices');

const getByProducts = async (_req, res, _next) => {
  try {
    const products = await productsServices.getByProducts();
    if (!products) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Algo de errado não está certo' });
  }
};

const getByProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsServices.getByProductsById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Algo de errado não está certo' });
  }
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  try {
    const newProduct = await productsServices.createProduct(name);
    return res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Algo de errado não está certo' });
  }
};
module.exports = { getByProducts, getByProductsById, createProduct };