const util = require('util');  // Import the util module
const solc = require('solc');
const { ethers, network } = require('hardhat');
const chai = require("chai");
const { expect } = require("chai");
//MODELS
const db = require("../models");
const path = require('path');
const fs = require("fs")
// const Contests = db.Contests;
const Programs = db.Programs;
const Submissions = db.Submissions;
// import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


exports.compiler = async (req, res) => {
  try {
    const { content } = req.body
    function findImports(importPath) {
      // Check if the import is for an OpenZeppelin contract
      if (importPath.startsWith('@openzeppelin/')) {
        const fullPath = path.resolve(__dirname, '..', 'node_modules', importPath);

        if (fs.existsSync(fullPath)) {
          return { contents: fs.readFileSync(fullPath, 'utf8') };
        } else {
          return { error: `File not found: ${importPath}` };
        }
      }

      // For other imports (if any)
      return { error: `File not found: ${importPath}` };
    }

    var input = {
      language: 'Solidity',
      sources: {
        'test.sol': {
          content: content,
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

    const output = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports }));
    if (output.errors) {
      const criticalErrors = output.errors.filter(err => err.severity === 'error');
      if (criticalErrors.length > 0) {
        return res.status(400).send({
          success: false,
          errors: criticalErrors.map(err => err.formattedMessage)
        });
      }
    }
    const compiledContracts = {};
    for (const contractName in output.contracts['test.sol']) {
      compiledContracts[contractName] = {
        abi: output.contracts['test.sol'][contractName].abi,
        bytecode: output.contracts['test.sol'][contractName].evm.bytecode.object
      };
      console.log(`${contractName}: ${compiledContracts[contractName].bytecode}`);
    }

    return res.status(200).send({
      success: true,
      contracts: compiledContracts,
      warnings: output.errors ? output.errors.filter(err => err.severity === 'warning').map(err => err.formattedMessage) : []
    });
  } catch (error) {
    console.error("Error while compiling", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};



exports.test = async (req, res) => {

  const { userCode='',submissionId='',testFileContent='',isPreview=true,walletAddress='' } = req.body; 

  try {
    function findImports(importPath) {
      // Check if the import is for an OpenZeppelin contract
      if (importPath.startsWith('@openzeppelin/')) {
        const fullPath = path.resolve(__dirname, '..', 'node_modules', importPath);

        if (fs.existsSync(fullPath)) {
          return { contents: fs.readFileSync(fullPath, 'utf8') };
        } else {
          return { error: `File not found: ${importPath}` };
        }
      }

      // For other imports (if any)
      return { error: `File not found: ${importPath}` };
    }

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

    const compiled = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports }));
    if (compiled.errors) {
      compiled.errors.forEach(err => {
        if (err.severity === 'error') {
          throw new Error(err.formattedMessage);
        }
      });
    }

    const contractNames = Object.keys(compiled.contracts['test.sol']);// Assuming the first contract is the main one
    console.log('Contract Names', contractNames);

    const [signer] = await ethers.getSigners();

    const factories = {};
    for (const contractName in compiled.contracts['test.sol']) {
      const abi = compiled.contracts['test.sol'][contractName].abi;
      const bytecode = compiled.contracts['test.sol'][contractName].evm.bytecode.object;
      factories[contractName] = new ethers.ContractFactory(abi, bytecode, signer);
    }

    function replaceContractFactory(code, factoryObjectName = 'factories') {
      const regex = /await\s+ethers\.getContractFactory\s*\(\s*["']([^"']+)["']\s*(?:,\s*([^)]+))?\s*\)/g;

      return code.replace(regex, (match, contractName, deployer) => {
        if (deployer) {
          return `${factoryObjectName}['${contractName}'].connect(${deployer})`;
        } else {
          return `${factoryObjectName}['${contractName}']`;
        }
      });
    }

    let results = [];
    let currentDescribe = null;
    let beforeEachFns = [];
    let afterEachFns = [];

    global.describe = (description, callback) => {
      currentDescribe = description;
      beforeEachFns = [];
      afterEachFns = [];
      callback();
      currentDescribe = null;
    };

    let testPromises = [];

    global.it = (description, testFunction) => {
      const testPromise = new Promise(async (resolve) => {
        const result = { description, passed: false, error: null };
        try {
          for (const beforeEachFn of beforeEachFns) {
            await beforeEachFn();
          }

          await testFunction();

          for (const afterEachFn of afterEachFns) {
            await afterEachFn();
          }

          result.passed = true;
        } catch (error) {
          result.error = error.message;
        } finally {
          results.push(result);
          resolve();
        }
      });

      testPromises.push(testPromise);
    };


    global.beforeEach = (fn) => {
      beforeEachFns.push(fn);
    };

    global.afterEach = (fn) => {
      afterEachFns.push(fn);
    };

    const modifiedTestContent = replaceContractFactory(testFileContent, 'factories');
    try {
      const [signer] = await ethers.getSigners();
      const testFunction = new Function('chai', 'ethers', 'expect', 'describe', 'it', 'beforeEach', 'afterEach', 'signer', 'network', `
      return async () => {
        const factories = {
          ${Object.entries(compiled.contracts['test.sol']).map(([name, contract]) => `
            '${name}': new ethers.ContractFactory(
              ${JSON.stringify(contract.abi)},
              "${contract.evm.bytecode.object}",
              signer
            )`).join(',\n')}
        };

        ${modifiedTestContent}
      }
    `);

      await testFunction(chai, ethers, expect, global.describe, global.it, global.beforeEach, global.afterEach, signer, network)();

      await Promise.all(testPromises);
      //IF IT IS NOT FOR PREVIEW TESTING
      if(isPreview==false)
      {
        const Submisison = await Submissions.findById(submissionId);
        if (!Submisison)
          return res.json(404).send({ error: true, message: "Invalid submission!" });
            // Calculate number of passing and failing tests
        const passedTests = results.filter(result => result.passed).length;
        const failedTests = results.length - passedTests;
        const xpForEachTestCase=500/results.length;
        const xpEarned=parseInt(xpForEachTestCase*passedTests).toFixed(0);
         //UPDATE THE SUBMISSION SCHEMA 
        //SAVING WALLET ADDRESS
        Submisison.walletAddress = walletAddress ?? '';
        Submisison.passedCases = passedTests;
        Submisison.totalCases = passedTests + failedTests;
        Submisison.testResults = results;
        Submisison.submittedCode = userCode;
        Submisison.submittedTime = new Date();
        Submisison.xp = xpEarned;
        Submisison.status = "completed"

        await Submisison.save();
        console.log("New Submisission updated");
        return res.json({passedTests,failedTests, results });
      }
      console.log("Preview submission done[+]")
      return res.json({results });
    } catch (error) {
      console.error("Error running tests:", error);
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
  finally {
    // Clean up the mocked globals
    delete global.describe;
    delete global.it;
    delete global.beforeEach;
    delete global.afterEach;
  }
}
exports.compileAndTest = async (req, res) => {
  const { userCode } = req.body;
  const Submisison = await Submissions.findById(req.body.submissionId);
  if (!Submisison)
    return res.json(404).send({ error: true, message: "Invalid submission!" });
  const Program = await Programs.findOne({ contestId: Submisison.contest });
  const testCases = Program.test_cases;
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
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");
    const signer = await provider.getSigner();
    // ethers.getSigner()
    const factory = new ethers.ContractFactory(abi, bytecode, signer);
    const contract = await factory.deploy();
    await contract.deployed();

    // Execute test cases
    const testResults = [];
    for (const testCase of testCases) {
      try {
        let testFunction = new Function('contract', 'assert', 'expect', `return (async () => { ${testCase.code} })(); `);
        await testFunction(contract, assert, expect);

        testResults.push({ passed: true, description: testCase.description });
      } catch (error) {
        testResults.push({ passed: false, description: testCase.description, error: error.message });
      }
    }

    // Calculate number of passing and failing tests
    const passedTests = testResults.filter(result => result.passed).length;
    const failedTests = testResults.length - passedTests;
    const xpForEachTestCase=500/testResults.length;
    const xpEarned=parseInt(xpForEachTestCase*passedTests).toFixed(0);
    //UPDATE THE SUBMISSION SCHEMA 
    //SAVING WALLET ADDRESS
    Submisison.walletAddress = req.body?.walletAddress ?? '';
    Submisison.passedCases = passedTests;
    Submisison.totalCases = passedTests + failedTests;
    Submisison.testResults = testResults;
    Submisison.submittedCode = userCode;
    Submisison.submittedTime = new Date();
    Submisison.xp = xpEarned;
    Submisison.status = "completed"

    await Submisison.save();
    console.log("Submisission updated");
    // Send test results back to the frontend
    res.json({ passedTests, failedTests, testResults });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred during compilation and testing' });
  }
}