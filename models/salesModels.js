const connection = require('./connection');
// let saleId = 2;
const getBySales = async () => {
  const [products] = await connection.execute(
    `SELECT s.id AS saleId,
    s.date, p.product_id AS productId, 
    p.quantity FROM StoreManager.sales AS s
    INNER JOIN StoreManager.sales_products AS p
    WHERE s.id = p.sale_id
    ORDER BY saleID ASC, productId;`,
  );
  return products;
};
const getBySalesById = async (id) => {
  const [product] = await connection.execute(
    `SELECT 
    s.date, p.product_id AS productId, 
    p.quantity FROM StoreManager.sales AS s
    INNER JOIN StoreManager.sales_products AS p
    WHERE p.sale_id = s.id AND p.sale_id = ?
    ORDER BY productId ASC
    ;`,
    [id],
  );
  return product;
};
const createproductSale = async (sales, insertId) => {
  sales.map((item) =>
    connection.execute(
      `
      INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES
    (?, ?, ?);
    ;`,
      [insertId, item.productId, item.quantity],
    ));
  const result = { id: insertId, itemsSold: sales };
  return result;
};
const createSale = async (sales) => {
  const result = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW());',
  );
  return createproductSale(sales, result[0].insertId);
};

const getByProductsById = async (id) => {
  const [product] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?;',
    [id],
  );
  return product;
};

const deleteSale = (id) => {
  connection.execute(
    `
    DELETE FROM StoreManager.sales
    WHERE id = ?;
  `,
    [id],
  );
  return { id };
};

const editSale = async (sale, id) => {
  await sale.map((item) =>
    connection.execute(
      `
      UPDATE StoreManager.sales_products
      SET
        quantity = ?
      WHERE sale_id = ? AND product_id = ?
    ;`,
      [item.quantity, id, item.productId],
    ));
  return sale;
};
module.exports = {
  getBySales,
  getBySalesById,
  createSale,
  getByProductsById,
  deleteSale,
  editSale,
};
