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
    if (!product[0]) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Algo de errado não está certo' });
  }
};
const validateSearch = (search) => { 
  for (let i = 0; i < search.length; i += 1) {
    if (search[i].length === 0 || search[i] === undefined) {
      return false;
    }
  }
  return true;
};

const createSale = async (req, res) => {
  const sale = req.body;
  try {
    const search = await Promise.all(sale.map((e) =>
      salesServices.getByProductsById(e.productId)));
    const validate = validateSearch(search);
    if (!validate) return res.status(404).json({ message: 'Product not found' });
    const newProduct = await salesServices.createSale(sale);
    if (!newProduct) {
        return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Algo de errado não está certo' });
  }
};

module.exports = { getBySales, getBySalesById, createSale };
