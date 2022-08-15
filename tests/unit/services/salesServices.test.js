const { expect } = require("chai");
const { describe } = require("mocha");
const sinon = require("sinon");

const connection = require("../../../models/connection");
const salesModels = require("../../../models/salesModels");
const salesServices = require("../../../services/salesServices");

const createProduct = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];
const saleSearch = [
  {
    saleId: 1,
    date: "2022-08-12T21:36:01.000Z",
    productId: 1,
    quantity: 5,
  },
];
const productSearch = [[], []];

describe("Buscando vendas no BD - SaleService", () => {
  describe("Quando não existe vendas cadastradas", () => {
    before(function () {
      sinon.stub(salesModels, "getBySales").resolves(productSearch);
    });
    after(function () {
      salesModels.getBySales.restore();
    });
    it("retorna um array", async () => {
      const search = await salesServices.getBySales();
      expect(search).to.be.an("array");
    });
    it("Retorna um array vazio", async () => {
      const search = await salesServices.getBySales();
      expect(search).to.be.not.empty;
    });
  });
  describe("Quando existem vendas criadas", () => {
    before(function () {
      const productSearch = [{ id: 1, name: "Martelo de Thor" }];
      sinon.stub(salesModels, "getBySales").resolves(productSearch);
    });
    after(function () {
      salesModels.getBySales.restore();
    });
    it("retorna um array", async () => {
      const search = await salesServices.getBySales();
      expect(search).to.be.an("array");
    });
    it("Array não está vazio", async () => {
      const search = await salesServices.getBySales();
      expect(search).to.be.not.empty;
    });
    it("Possui um objeto", async () => {
      const search = await salesServices.getBySales();
      expect(search[0]).to.be.an("object");
    });
    it("Objeto contém as propriedades de id e name", async () => {
      const search = await salesServices.getBySales();
      expect(search[0]).to.include.all.keys("id", "name");
    });
  });
  describe("Procurando Id específico", () => {
    before(() => {
      sinon.stub(salesModels, "getBySalesById").resolves(saleSearch);
    });
    after(() => {
      salesModels.getBySalesById.restore();
    });
    it("Procura um id especifico", async () => {
      const search = await salesServices.getBySalesById(1);
      // console.log(search);
      expect(search[0]).to.include.all.keys("date", "productId", "quantity");
    });
  });
  describe("Valida Id específico", () => {
    before(() => {
      sinon.stub(salesModels, "getByProductsById").resolves(saleSearch);
    });
    after(() => {
      salesModels.getByProductsById.restore();
    });
    it("Procura um id especifico", async () => {
      const search = await salesServices.getByProductsById(1);
      // console.log(search);
      expect(search[0]).to.include.all.keys("date", "productId", "quantity");
    });
  });
  describe("Criação de venda", () => {
    before(() => {
      sinon.stub(salesModels, "createSale").resolves(createProduct);
    });
    after(() => {
      salesModels.createSale.restore();
    });
    it("Criando uma venda, retornando objeto com ProductId e quantity", async () => {
      const resultCreate = await salesServices.createSale(createProduct);
      expect(resultCreate[0]).to.be.a("object");
      expect(resultCreate[0]).to.include.all.keys("productId", "quantity");
    });
  });
});
