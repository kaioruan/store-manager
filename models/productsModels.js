const connection = require('./connection');

const getByProducts = async () => {
  const [products] = await connection.query('SELECT * FROM StoreManager.products;');
  return products;
};

const getByProductsById = async (id) => {
  console.log(id);
  const [[product]] = await connection.query(
    'SELECT * FROM StoreManager.products WHERE id = ?;',
    [id],
  );
  console.log(product);
  return product;
};

const createProduct = async (name) => {
  const [newProduct] = await connection.query(
    'INSERT INTO StoreManager.products (name) VALUES (?);', [name],
  );
  return { id: newProduct.insertId, name };
};

module.exports = { getByProducts, getByProductsById, createProduct };