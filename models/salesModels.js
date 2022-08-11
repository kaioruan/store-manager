const connection = require('./connection');

const getBySales = async () => {
  const [products] = await connection.query(
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
  console.log(id);
  const [product] = await connection.query(
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

module.exports = { getBySales, getBySalesById };
