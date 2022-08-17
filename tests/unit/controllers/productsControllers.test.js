const sinon = require("sinon");
const { expect } = require("chai");
const { before } = require("mocha");
const productsController = require('../../../controllers/productsControllers');
const productsServices = require('../../../services/productsServices');

const productTest = [{
  id: 1,
  name: "Martelo de Thor",
}];
const response = {};
const request = {};

describe('Busca todos os produtos no BD - Controller', () => {
  describe("Quando não existe produto cadastrado", () => {
    before(function () {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsServices, "getByProducts").resolves();
    });
    after(function () {
      productsServices.getByProducts.restore();
    });
    it("O status seja 404", async () => {
      await productsController.getByProducts(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });
  });
  describe('Quando o servidor não responde', () => {
    before(function () {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsServices, "getByProducts").rejects();
      sinon.stub(productsServices, "getByProductsById").rejects();
      sinon.stub(productsServices, "getBySearch").rejects();
      sinon.stub(productsServices, "deleteProduct").rejects();
    });
    after(function () {
      productsServices.getByProducts.restore();
      productsServices.getByProductsById.restore();
      productsServices.getBySearch.restore();
      productsServices.deleteProduct.restore();
    });
    it("O status seja 500 ao procurar todos produtos", async () => {
      await productsController.getByProducts(request, response);
      expect(response.status.calledWith(500)).to.be.equal(true);
    });
    it("O status seja 500 ao procurar um ID específico", async () => {
      await productsController.getByProductsById(request, response);
      expect(response.status.calledWith(500)).to.be.equal(true);
    });
    it("O status seja 500 ao procurar pelo search", async () => {
      await productsController.getBySearch(request, response);
      expect(response.status.calledWith(500)).to.be.equal(true);
    });
    it("O status seja 500 ao tentar deletar", async () => {
      const req = { params: { id: 1}}
      await productsController.deleteProduct(req, response);
      expect(response.status.calledWith(500)).to.be.equal(true);
    });
  });
  describe('Quando existe produto cadastrado', () => {
    before(function () {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsServices, "getByProducts").resolves(productTest);
    });
    after(function () {
      productsServices.getByProducts.restore();
    });
    it('O status seja 200', async () => {
    await productsController.getByProducts(request, response);
    expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it("Quando existem produtos cadastrados", async () => {
      await productsController.getByProducts(request, response);
      expect(response.json.calledWith(productTest)).to.be.equal(true);
    });
  });
  describe("Buscando um ID específico", () => {
    const res = {};
    const req = { params: { id: 1 } };
    before(function () {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, "getByProductsById").resolves(productTest);
    });
    after(function () {
      productsServices.getByProductsById.restore();
    });
    it("O status seja 200 ao encontrar", async () => {
      await productsController.getByProductsById(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });
  describe("Buscando um produto pelo /search", () => {
    const res = {};
    const req = { query: { q: 'martelo' } };
    before(function () {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, "getBySearch").resolves(productTest);
    });
    after(function () {
      productsServices.getBySearch.restore();
    });
    it("O status seja 200 ao encontrar", async () => {
      await productsController.getBySearch(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
    it("O produto foi encontrado", async () => {
      await productsController.getBySearch(req, res);
      expect(res.json.calledWith(productTest)).to.be.equal(true);
    });
  });
});
