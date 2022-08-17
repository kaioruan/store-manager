const productsServices = require('../services/productsServices');

const ERROR_500 = 'Algo de errado não está certo';
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
    return res.status(500).json({ message: ERROR_500 });
  }
};

const editProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const product = await productsServices.getByProductsById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    const updateProduct = await productsServices.editProduct({ id, name });
    return res.status(200).json(updateProduct);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: ERROR_500 });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productsServices.getByProductsById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    await productsServices.deleteProduct(id);
    return res.status(204).json();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: ERROR_500 });
  }
};

const getBySearch = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      const allProducts = await productsServices.getByProducts();
      return res.status(200).json(allProducts);
    }
    const searchName = await productsServices.getBySearch(q);
    return res.status(200).json(searchName);
  } catch (error) {
      console.log(error);
      return res.status(500).json({ message: ERROR_500 });
  }
};

module.exports = {
  getByProducts,
  getByProductsById,
  createProduct,
  editProduct,
  deleteProduct,
  getBySearch,
};
