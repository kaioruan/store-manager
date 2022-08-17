const sinon = require("sinon");
const { expect } = require("chai");
const { before } = require("mocha");
const salesControllers = require("../../../controllers/salesControllers");
const salesServices = require("../../../services/salesServices");

const productTest = [
  {
    id: 1,
    name: "Martelo de Thor",
  },
];
const sale = [
  {
    date: "2022-08-17T16:32:31.000Z",
    productId: 1,
    quantity: 5,
  },
  {
    date: "2022-08-17T16:32:31.000Z",
    productId: 2,
    quantity: 10,
  },
];

const response = {};
const request = {};

describe("Busca todos os produtos no BD - SaleController", () => {
  describe("Quando não existe produto cadastrado", () => {
    before(function () {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesServices, "getBySales").resolves();
    });
    after(function () {
      salesServices.getBySales.restore();
    });
    it("O status seja 404", async () => {
      await salesControllers.getBySales(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });
  });
  describe("Quando o servidor não responde", () => {
    before(function () {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesServices, "getBySales").rejects();
      sinon.stub(salesServices, "getBySalesById").rejects();
    });
    after(function () {
      salesServices.getBySales.restore();
      salesServices.getBySalesById.restore();
    });
    it("O status seja 500 ao buscar todas vendas", async () => {
      await salesControllers.getBySales(request, response);
      expect(response.status.calledWith(500)).to.be.equal(true);
    });
    it("O status seja 500 ao procurar um ID específico", async () => {
      await salesControllers.getBySalesById(request, response);
      expect(response.status.calledWith(500)).to.be.equal(true);
    });
  });
  describe("Quando existe produto cadastrado", () => {
    before(function () {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesServices, "getBySales").resolves(productTest);
    });
    after(function () {
      salesServices.getBySales.restore();
    });
    it("O status seja 200", async () => {
      await salesControllers.getBySales(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it("Quando existem produtos cadastrados", async () => {
      await salesControllers.getBySales(request, response);
      expect(response.json.calledWith(productTest)).to.be.equal(true);
    });
  });
  describe("Buscando um ID específico", () => {
    const res = {};
    const req = { params: { id: 1 } };
    before(function () {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesServices, "getBySalesById").resolves(productTest);
    });
    after(function () {
      salesServices.getBySalesById.restore();
    });
    it("O status seja 200 ao encontrar", async () => {
      await salesControllers.getBySalesById(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });
  describe("Deletando um ID específico", () => {
    const res = {};
    const req = { params: { id: 1 } };
    before(function () {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesServices, "deleteSale").resolves(sale);
    });
    after(function () {
      salesServices.deleteSale.restore();
    });
    it("O status seja 204 ao deletar", async () => {
      await salesControllers.deleteSale(req, res);
      expect(res.status.calledWith(204)).to.be.equal(true);
    });
  });
  describe("Erro 500 ao tentar deletar um ID específico", () => {
    const res = {};
    const req = { params: { id: 1 } };
    before(function () {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesServices, "deleteSale").rejects(sale);
    });
    after(function () {
      salesServices.deleteSale.restore();
    });
    it("O status seja 500 ao encontrar", async () => {
      await salesControllers.deleteSale(req, res);
      expect(res.status.calledWith(500)).to.be.equal(true);
    });
  });
});
