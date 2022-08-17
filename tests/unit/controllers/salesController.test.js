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
      const result = await salesControllers.getBySales(request, response);
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
    it("O status seja 500", async () => {
      const result = await salesControllers.getBySales(request, response);
      expect(response.status.calledWith(500)).to.be.equal(true);
    });
    it("O status seja 500 ao procurar um ID específico", async () => {
      const result = await salesControllers.getBySalesById(request, response);
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
      const result = await salesControllers.getBySalesById(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });
  // describe("Deletando um ID específico", () => {
  //   const res = {};
  //   const req = { params: { id: 1 } };
  //   before(function () {
  //     res.status = sinon.stub().returns(res);
  //     res.json = sinon.stub().returns();
  //     sinon.stub(salesServices, "deleteSale").resolves(1);
  //   });
  //   after(function () {
  //     salesServices.deleteSale.restore();
  //   });
  //   it("O status seja 204 ao encontrar", async () => {
  //     const result = await salesControllers.deleteSale(req, res);
  //     console.log(result);
  //     expect(res.status.calledWith(404)).to.be.equal(true);
  //   });
  // });
});
