const { expect } = require("chai");
const { describe } = require("mocha");
const sinon = require("sinon");

const connection = require("../../../models/connection");
const salesModels = require("../../../models/salesModels");

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

describe("Buscando vendas no BD", () => {
  describe("Quando não existe vendas cadastradas", () => {
    before(function () {
      sinon.stub(connection, "execute").resolves(productSearch);
    });
    after(function () {
      connection.execute.restore();
    });
    it("retorna um array", async () => {
      const search = await salesModels.getBySales();
      expect(search).to.be.an("array");
    });
    it("Retorna um array vazio", async () => {
      const search = await salesModels.getBySales();
      expect(search).to.be.empty;
    });
  });
  describe("Quando existem vendas criadas", () => {
    before(function () {
      const productSearch = [{ id: 1, name: "Martelo de Thor" }];
      sinon.stub(connection, "execute").resolves(productSearch);
    });
    after(function () {
      connection.execute.restore();
    });
    it("retorna um array", async () => {
      const search = await salesModels.getBySales();
      expect(search).to.be.an("object");
    });
    it("Array não está vazio", async () => {
      const search = await salesModels.getBySales();
      expect(search).to.be.not.empty;
    });
    it("Possui um objeto", async () => {
      const search = await salesModels.getBySales();
      expect(search).to.be.an("object");
    });
    it("Objeto contém as propriedades de id e name", async () => {
      const search = await salesModels.getBySales();
      expect(search).to.include.all.keys("id", "name");
    });
  });
  describe("Procurando Id específico", () => {
    before(() => {
      sinon.stub(connection, "execute").resolves(saleSearch);
    });
    after(() => {
      connection.execute.restore();
    });
    it("Procura um id especifico", async () => {
      const search = await salesModels.getBySalesById(1);
      // console.log(search);
      expect(search).to.include.all.keys("date", "productId", "quantity");
    });
  });
  describe("Criação de venda", () => {
    before(() => {
      sinon.stub(connection, "execute").resolves(createProduct);
    });
    after(() => {
      connection.execute.restore();
    });
    it("Criando uma venda", async () => {
      const resultCreate = await salesModels.createSale(createProduct);
      // expect(resultCreate).to.be.a("object");
      expect(resultCreate).to.include.all.keys("id", "itemsSold");
    });
  });
});
