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
      const result = await productsController.getByProducts(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });
  });
  describe('Quando o servidor não responde', () => {
    before(function () {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsServices, "getByProducts").rejects();
      sinon.stub(productsServices, "getByProductsById").rejects();
    });
    after(function () {
      productsServices.getByProducts.restore();
      productsServices.getByProductsById.restore();
    });
    it("O status seja 500 ao procurar todos produtos", async () => {
      const result = await productsController.getByProducts(request, response);
      console.log(result);
      expect(response.status.calledWith(500)).to.be.equal(true);
    });
    it("O status seja 500 ao procurar um ID específico", async () => {
      const result = await productsController.getByProductsById(request, response);
      console.log(result);
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
      const result = await productsController.getByProductsById(req, res);
      console.log(result);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });
});
