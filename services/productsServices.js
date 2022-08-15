const productsModels = require('../models/productsModels');

const getByProducts = async () => productsModels.getByProducts();

const getByProductsById = async (id) => productsModels.getByProductsById(id);

const createProduct = async (name) => productsModels.createProduct(name);

const editProduct = async (product) => {
  // const { id } = product;
  const updateProduct = await productsModels.editProduct(product.id, product.name);
  if (!updateProduct) return null;
  return updateProduct;
};

module.exports = {
  getByProducts,
  getByProductsById,
  createProduct,
  editProduct,
};