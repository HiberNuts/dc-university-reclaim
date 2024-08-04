const { ethers } = require("hardhat");
const controller = require("../controllers/solcController");
const solc = require("solc");
const chai = require('chai');
const assert = chai.assert;
const { expect } = require("chai");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/compile", controller.compiler);
  // app.post("/api/test-smart-contract", controller.testContract)

  app.post('/api/compile-and-test', controller.compileAndTest);

  app.post('/api/test', controller.compiler, controller.test);

};
