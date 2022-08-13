const sinon = require("sinon");
const { expect } = require("chai");
const { before } = require("mocha");
const productsController = require('../../../controllers/productsControllers');
const productsServices = require('../../../services/productsServices');

const productTest = {
  id: 1,
  name: "Martelo de Thor",
};

describe('Busca todos os produtos no BD - Controller', () => {
  describe('Quando não existe produto cadastrado', () => {
  const response = {};
  const request = {};
  it('Quando não existe nenhum produto cadastrado', () => {
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsServices, 'getByProducts').resolves([]);
    });
    after(() => {
      productsServices.getByProducts.restore();
    });
  });
  it('O status seja 400', async () => {
    await productsController.getByProducts(request, response);
    expect(response.status.calledWith(400)).to.be.equal(true);
  });
});
  describe('Quando existe produtos cadastrados', () => {
    const response = {};
    const request = {};
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsServices, "getByProducts").resolves([productTest]);
      after(() => {
        productsServices.getByProducts.restore();
      })
    })
    it('Quando existem produtos cadastrados', async () => {
      await productsController.getByProducts(request, response);
      expect(response.json.calledWith([productTest])).to.be.equal(true);
    });
  });
});
