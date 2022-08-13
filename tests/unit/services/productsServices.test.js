const { expect } = require("chai");
const { describe } = require("mocha");
const sinon = require("sinon");

const connection = require("../../../models/connection");
const productsModel = require("../../../models/productsModels");
const productsServices = require('../../../services/productsServices');

const createProduct = [{ name: "ProdutoX" }];
const productSearch = [[], []];
const productId = [{ id: 1, name: "Martelo de Thor" }];

describe("Buscando produtos no BD", () => {
  describe("Quando não existe produtos cadastrados", () => {
    before(function () {
      sinon.stub(productsModel, "getByProducts").resolves(productSearch);
    });
    after(function () {
      connection.execute.restore();
    });
    it("retorna um array", async () => {
      const search = await productsServices.getByProducts();
      expect(search).to.be.an("array");
    });
    it("Retorna um array vazio", async () => {
      const search = await productsServices.getByProducts();
      expect(search).to.be.empty;
    });
  });
  describe("Quando existem produtos criados", () => {
    before(function () {
      const productSearch = [{ id: 1, name: "Martelo de Thor" }];
      sinon.stub(productsModel, "getByProducts").resolves(productSearch);
    });
    after(function () {
      connection.execute.restore();
    });
    it("retorna um array", async () => {
      const search = await productsServices.getByProducts();
      expect(search).to.be.an("object");
    });
    it("Array não está vazio", async () => {
      const search = await productsServices.getByProducts();
      expect(search).to.be.not.empty;
    });
    it("Possui um objeto", async () => {
      const search = await productsServices.getByProducts();
      expect(search).to.be.an("object");
    });
    it("Objeto contém as propriedades de id e name", async () => {
      const search = await productsServices.getByProducts();
      expect(search).to.include.all.keys("id", "name");
    });
  });
  describe("Procurando Id específico", () => {
    before(() => {
      sinon.stub(productsModel, "getByProductsById").resolves([1]);
    });
    after(() => {
      connection.execute.restore();
    });
    it("Procura um id especifico", async () => {
      const search = await productsServices.getByProductsById([1]);
      // console.log(search);
      expect(search).to.include.all.keys("id", "name");
    });
  });
  describe("Criação de produto", () => {
    before(() => {
      sinon.stub(productsModel, "createProduct").resolves(createProduct);
    });
    after(() => {
      connection.execute.restore();
    });
    it("Criando um produto", async () => {
      const resultCreate = await productsServices.createProduct(createProduct);
      // expect(resultCreate).to.be.a("object");
      expect(resultCreate).to.include.all.keys("id", "name");
    });
  });
});
