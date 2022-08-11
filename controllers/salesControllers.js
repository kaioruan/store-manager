const salesServices = require('../services/salesServices');

const getBySales = async (_req, res, _next) => {
  try {
    const products = await salesServices.getBySales();
      if (!products) {
        return res.status(404).json({ message: 'Product not found' });
      }
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Algo de errado não está certo' });
  }
};

const getBySalesById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await salesServices.getBySalesById(id);
    console.log(product);
    if (!product[0]) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Algo de errado não está certo' });
  }
};

const createSale = async (req, res) => {
  const sale = req.body;
  try {
    const newProduct = await salesServices.createSale(sale);
    if (!newProduct) {
        return res.status(404).json({ message: 'Sale not found' });
    }
    return res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Algo de errado não está certo' });
  }
};
module.exports = { getBySales, getBySalesById, createSale };
