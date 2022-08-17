const { expect } = require("chai");
const { describe } = require("mocha");
const sinon = require("sinon");

const connection = require("../../../models/connection");
const productsModels = require("../../../models/productsModels");
const productsServices = require('../../../services/productsServices');

const createProduct = [{ name: "ProdutoX" }];
const productSearch = [[], []];
const productId = [{ id: 1, name: "Martelo de Thor" }];

describe("Buscando produtos no BD - ProductService", () => {
  describe("Quando não existe produtos cadastrados", () => {
    before(function () {
      sinon.stub(productsModels, "getByProducts").resolves(productSearch);
    });
    after(function () {
      productsModels.getByProducts.restore();
    });
    it("retorna um array", async () => {
      const search = await productsServices.getByProducts();
      expect(search).to.be.an("array");
    });
    it("Retorna um array vazio", async () => {
      const search = await productsServices.getByProducts();
      expect(search).to.be.not.empty;
    });
  });
  describe("Quando existem produtos criados", () => {
    before(function () {
      const productSearch = [{ id: 1, name: "Martelo de Thor" }];
      sinon.stub(productsModels, "getByProducts").resolves(productSearch);
    });
    after(function () {
      productsModels.getByProducts.restore();
    });
    it("retorna um array", async () => {
      const search = await productsServices.getByProducts();
      expect(search).to.be.an("array");
    });
    it("Array não está vazio", async () => {
      const search = await productsServices.getByProducts();
      expect(search).to.be.not.empty;
    });
    it("Possui um objeto", async () => {
      const search = await productsServices.getByProducts();
      expect(search[0]).to.be.an("object");
    });
    it("Objeto contém as propriedades de id e name", async () => {
      const search = await productsServices.getByProducts();
      expect(search[0]).to.include.all.keys("id", "name");
    });
  });
  describe("Procurando Id específico", () => {
    before(() => {
      sinon.stub(productsModels, "getByProductsById").resolves(productId);
    });
    after(() => {
      productsModels.getByProductsById.restore();
    });
    it("Procura um id especifico", async () => {
      const search = await productsServices.getByProductsById(1);
      expect(search[0]).to.include.all.keys("id", "name");
    });
  });
  describe("Criação de produto", () => {
    before(() => {
      sinon.stub(productsModels, "createProduct").resolves(createProduct);
    });
    after(() => {
      productsModels.createProduct.restore();
    });
    it("Criando um produto", async () => {
      const resultCreate = await productsServices.createProduct(createProduct);
      expect(resultCreate[0]).to.include.all.keys("name");
    });
  });
  describe("Editando produto", () => {
    before(() => {
      sinon.stub(productsModels, "editProduct").resolves({ id: 1, name: 'Martelo de Odin'});
    });
    after(() => {
      productsModels.editProduct.restore();
    });
    it("Editando um produto", async () => {
      const resultCreate = await productsServices.editProduct({
        id: 1,
        name: "Martelo de Odin",
      });
      expect(resultCreate.name).to.be.equal("Martelo de Odin");
    });
  });
});
