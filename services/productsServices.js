const productsModels = require('../models/productsModels');

const getByProducts = async () => productsModels.getByProducts();

const getByProductsById = async (id) => productsModels.getByProductsById(id);

const createProduct = async (name) => productsModels.createProduct(name);

module.exports = { getByProducts, getByProductsById, createProduct };