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
  app.post("/api/test-smart-contract", controller.testContract)

  app.post('/api/compile-and-test', async (req, res) => {
    const { userCode, testCases } = req.body;

    try {
      var input = {
        language: 'Solidity',
        sources: {
          'test.sol': {
            content: userCode,
          }
        },
        settings: {
          outputSelection: {
            '*': {
              '*': ['*']
            }
          }
        }
      };

      const compiled = JSON.parse(solc.compile(JSON.stringify(input)));
      if (compiled.errors) {
        compiled.errors.forEach(err => {
          if (err.severity === 'error') {
            throw new Error(err.formattedMessage);
          }
        });
      }
      const abi = compiled.contracts["test.sol"].TestContract.abi;
      const bytecode = compiled.contracts["test.sol"].TestContract.evm.bytecode.object;

      // Deploy contract to local Hardhat network
      const provider = new ethers.providers.JsonRpcProvider();
      const signer = await provider.getSigner();
      const factory = new ethers.ContractFactory(abi, bytecode, signer);
      const contract = await factory.deploy();
      await contract.deployed();

      // Execute test cases
      const testResults = [];
      for (const testCase of testCases) {
        try {
          let testFunction = new Function('contract', 'assert', 'expect', `return (async () => { ${testCase.code} })();`);
          await testFunction(contract, assert, expect);

          testResults.push({ passed: true, description: testCase.description });
        } catch (error) {
          testResults.push({ passed: false, description: testCase.description, error: error.message });
        }
      }

      // Calculate number of passing and failing tests
      const passedTests = testResults.filter(result => result.passed).length;
      const failedTests = testResults.length - passedTests;

      // Send test results back to the frontend
      res.json({ passedTests, failedTests, testResults });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred during compilation and testing' });
    }
  });

};
