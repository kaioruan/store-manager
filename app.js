const express = require('express');
const productsController = require('./controllers/productsControllers');
const salesControllers = require('./controllers/salesControllers');
const {
  nameValidation,
  saleValidation,
  quantitySaleValitation,
} = require('./middlewares/productValidation');

const app = express();
app.use(express.json());

const PRODUCTS_ID = '/products/:id';

app.get('/products', productsController.getByProducts);
app.get(PRODUCTS_ID, productsController.getByProductsById);
app.put(PRODUCTS_ID, nameValidation, productsController.editProduct);
app.post('/products', nameValidation, productsController.createProduct);
app.post('/sales', saleValidation, quantitySaleValitation, salesControllers.createSale);
app.get('/sales', salesControllers.getBySales);
app.get('/sales/:id', salesControllers.getBySalesById);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar

// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;