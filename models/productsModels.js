const connection = require('./connection');

const getByProducts = async () => {
  const [products] = await connection.execute('SELECT * FROM StoreManager.products;');
  return products;
};

const getByProductsById = async (id) => {
  const [product] = await connection.query(
    `
    DELETE FROM StoreManager.sales
    WHERE id = ?
  `,
    [id],
  );
  return product;
};

const createProduct = async (name) => {
  const [newProduct] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?);', [name],
  );
  return { id: newProduct.insertId, name };
};

const editProduct = (id, name) => {
  connection.execute(
    `
    UPDATE StoreManager.products 
    SET name = ?
    WHERE id = ?;`,
    [name, id],
  );
  return { id, name };
};

const deleteProduct = (id) => {
  connection.execute(
    `
    DELETE FROM StoreManager.products
  WHERE id = ?;`,
    [id],
  );
  return { id };
};

module.exports = {
  getByProducts,
  getByProductsById,
  createProduct,
  editProduct,
  deleteProduct,
};