// const sinon = require("sinon");
// const { expect } = require("chai");
// const { before } = require("mocha");
// const salesControllers = require("../../../controllers/salesControllers");
// const salesServices = require("../../../services/salesServices");

// const productTest = {
//   id: 1,
//   name: "Martelo de Thor",
// };

// describe("Busca todos os produtos no BD", () => {
//   describe("Quando não existe produto cadastrado", () => {
//     const response = {};
//     const request = {};
//     it("Quando não existe nenhum produto cadastrado", () => {
//       before(() => {
//         response.status = sinon.stub().returns(response);
//         response.json = sinon.stub().returns();
//         sinon.stub(salesServices, "getByProducts").resolves([]);
//       });
//       after(() => {
//         salesServices.getByProducts.restore();
//       });
//     });
//     it("O status seja 400", async () => {
//       await salesControllers.getByProducts(request, response);
//       expect(response.status.calledWith(400)).to.be.equal(true);
//     });
//   });
//   describe("Quando existe produtos cadastrados", () => {
//     const response = {};
//     const request = {};
//     before(() => {
//       response.status = sinon.stub().returns(response);
//       response.json = sinon.stub().returns();
//       sinon.stub(salesServices, "getByProducts").resolves([productTest]);
//       after(() => {
//         salesServices.getByProducts.restore();
//       });
//     });
//     it("Quando existem produtos cadastrados", async () => {
//       await salesControllers.getByProducts(request, response);
//       expect(response.json.calledWith([productTest])).to.be.equal(true);
//     });
//   });
// });
