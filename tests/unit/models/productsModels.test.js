const { expect } = require("chai");
const { describe } = require("mocha");
const sinon = require("sinon");

const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModels');

const createProduct = [{ name: "ProdutoX" }];
const productSearch = [[], []];
const productId = [{ id: 1, name: "Martelo de Thor" }];
describe('Buscando produtos no BD - ModelProduct', () => {
  describe('Quando não existe produtos cadastrados', () => {
    before(function () {
      sinon.stub(connection, "execute").resolves(productSearch);
    });
    after(function () {
      connection.execute.restore();
    });
    it('retorna um array', async () => {
      const search = await productsModel.getByProducts();
      expect(search).to.be.an('array');
    })
  })
  describe('Quando existem produtos criados', () => {
    before( function () {
      const productSearch = [{ id: 1, name: "Martelo de Thor" }];
      sinon.stub(connection, "execute").resolves(productSearch);
    });
    after(function () {
      connection.execute.restore();
    });
    it('retorna um array', async () => {
      const search = await productsModel.getByProducts();
      expect(search).to.be.an('array');
    });
    it("Array não está vazio", async () => {
      const search = await productsModel.getByProducts();
      expect(search).to.be.not.empty;
    });
    it("Possui um objeto", async () => {
      const search = await productsModel.getByProducts();
      expect(search[0]).to.be.an('object');
    });
    it("Objeto contém as propriedades de id e name", async () => {
      const search = await productsModel.getByProducts();
      expect(search[0]).to.include.all.keys('id', 'name');
    });
  });
  describe('Procurando Id específico', () => {
    before(() => {
      sinon.stub(connection, "execute").resolves(productId);
    });
    after(() => {
      connection.execute.restore();
    });
    it("Procura um id especifico", async () => {
      const search = await productsModel.getByProductsById(1);
      expect(search).to.include.all.keys("id", "name");
      expect(search.name).to.be.equal("Martelo de Thor");
    });
  })
  describe('Criação de produto', () => {
    before(() => {
      sinon.stub(connection, "execute").resolves(createProduct);
    });
    after(() => {
      connection.execute.restore();
    });
    it('Criando um produto', async () => {
      const resultCreate = await productsModel.createProduct(createProduct);
      expect(resultCreate).to.include.all.keys("id", "name");
    });
  })
  describe("Procurando produto pelo search", () => {
    before(() => {
      sinon.stub(connection, "execute").resolves(productId);
    });
    after(() => {
      connection.execute.restore();
    });
    it("Procurando produto pelo search", async () => {
      const resultCreate = await productsModel.getBySearch('martelo');
      expect(resultCreate[0].name).to.be.equal('Martelo de Thor');
    });
  });
})
