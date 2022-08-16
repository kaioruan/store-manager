const salesModels = require('../models/salesModels');

const getBySales = async () => salesModels.getBySales();
const getBySalesById = async (id) => salesModels.getBySalesById(id);
const getByProductsById = async (id) => salesModels.getByProductsById(id);

const createSale = async (sale) => salesModels.createSale(sale);

const deleteSale = async (id) => {
  const removeSale = await salesModels.deleteSale(id);
  if (!removeSale) return null;
  return removeSale;
};

const editSale = async (sale, id) => {
  const updateSale = await salesModels.editSale(sale, id);
  if (!updateSale) return null;
  return updateSale;
};

module.exports = {
  getBySales,
  getBySalesById,
  createSale,
  getByProductsById,
  deleteSale,
  editSale,
};
