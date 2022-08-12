const salesModels = require('../models/salesModels');

const getBySales = async () => salesModels.getBySales();

const getBySalesById = async (id) => salesModels.getBySalesById(id);

const getByProductsById = async (id) => salesModels.getByProductsById(id);

const createSale = async (sale) => salesModels.createSale(sale);

module.exports = { getBySales, getBySalesById, createSale, getByProductsById };
