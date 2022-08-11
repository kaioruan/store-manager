const productsModels = require('../models/productsModels');

const getByProducts = async () => productsModels.getByProducts();

const getByProductsById = async (id) => productsModels.getByProductsById(id);

module.exports = { getByProducts, getByProductsById };