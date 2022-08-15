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
    });
    after(function () {
      salesServices.getBySales.restore();
    });
    it("O status seja 500", async () => {
      const result = await salesControllers.getBySales(request, response);
      console.log(result);
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
    // before(function () {
    //   response.status = sinon.stub().returns(response);
    //   response.json = sinon.stub().returns();
    //   sinon.stub(salesServices, "getBySales").resolves();
    // });
    // after(function () {
    //   salesServices.getBySales.restore();
    // });
    // it("O status seja 500", async () => {
    //   const result = await salesControllers.getBySales(request, response);
    //   console.log(result);
    //   expect(response.status.calledWith(500)).to.be.equal(true);
    // });
  });
});
