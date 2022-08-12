const nameValidation = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  if (name.length < 5) {
    return res
      .status(422)
      .json({ message: '"name" length must be at least 5 characters long' });
  }
  next();
};

const saleValidation = (req, res, next) => {
  const sales = req.body;
  for (let i = 0; i < sales.length; i += 1) {
    if (!('quantity' in sales[i])) {
      return res.status(400).json({ message: '"quantity" is required' });
    }
    if (!('productId' in sales[i])) {
      return res.status(400).json({ message: '"productId" is required' });
    }
  }
  next();
};

const quantitySaleValitation = (req, res, next) => {
  const sales = req.body;
  for (let i = 0; i < sales.length; i += 1) {
    if (sales[i].quantity <= 0) {
      return res
        .status(422)
        .json({ message: '"quantity" must be greater than or equal to 1' });
    }
  }
  next();
};

module.exports = { nameValidation, saleValidation, quantitySaleValitation };
