const util = require('util');  // Import the util module
const exec = util.promisify(require('child_process').exec);
const solc = require('solc');
const { ethers } = require('hardhat');
const chai = require('chai');
const assert = chai.assert;
const { expect } = require("chai");

const fs = require('fs');
const path = require('path');
//MODELS
const db = require("../models");
const Contests = db.Contests;
const Programs = db.Programs;
const Submissions=db.Submissions;

function generateTestContent(testCases) {
  // Create the test file content based on the test cases
  let testContent = `
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TestContract", function () {
  let TestContract;
  let contract;

  before(async function () {
    TestContract = await ethers.getContractFactory("TestContract");
    contract = await TestContract.deploy();
    await contract.deployed();
  });

  ${testCases.map(testCase => `
  it("${testCase.description}", async function () {
    ${testCase.code}
  });
  `).join('\n')}
});
  `;
  return testContent;
}
function parseTestResults(output) {
  const results = [];
  const lines = output.split('\n');
  console.log(JSON.stringify(output))

  lines.forEach(line => {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('✔') || trimmedLine.startsWith('✖')) {
      results.push({
        description: trimmedLine.replace(/^[✔✖]\s*/, ''),
        passed: trimmedLine.startsWith('✔')
      });
    }
  });
  return { results };
}




exports.compiler = async (req, res) => {
  try {
    const { content } = req.body
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

    var output = JSON.parse(solc.compile(JSON.stringify(input)));
    // console.log("Compiled->>", output);
    if(!output.errors)
      for (var contractName in output.contracts['test.sol']) {
        console.log(
          contractName +
          ': ' +
          output.contracts['test.sol'][contractName].evm.bytecode.object
        );
      }
      return res.status(200).send(output)
  } catch (error) {
    console.error("Error while compiling", error);
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
};

exports.testContract = async (req, res) => {
  const { contractSource, testCases } = req.body;

  try {
    const parentDir = path.dirname(__dirname);
    const contractsDir = path.join(parentDir, 'contracts');
    const testDir = path.join(parentDir, 'test');

    if (!fs.existsSync(contractsDir)) {
      console.log('Creating contracts directory');
      fs.mkdirSync(contractsDir);
    }

    if (!fs.existsSync(testDir)) {
      console.log('Creating test directory');
      fs.mkdirSync(testDir);
    }

    // Save the smart contract source code to a file
    const contractPath = path.join(contractsDir, 'TestContract.sol');
    console.log(`Writing contract to ${contractPath}`);
    fs.writeFileSync(contractPath, contractSource);

    // Generate the test file
    const testPath = path.join(testDir, 'TestContract.js');
    console.log(`Writing test cases to ${testPath}`);
    const testContent = generateTestContent(testCases);
    fs.writeFileSync(testPath, testContent);

    console.log('Running Hardhat tests');
    const { stdout, stderr } = await exec('npx hardhat test');

    if (stderr) {
      console.error('Error running Hardhat tests:', stderr);
      res.status(500).send({ error: stderr.stdout });
      return;
    }

    // Parse test results
    const results = parseTestResults(stdout);
    res.send(results);

  } catch (error) {
    const results = parseTestResults(error.stdout);
    res.send(results);
    // res.status(500).send({ error: error.stdout });
  }
}

exports.compileAndTest=async(req,res)=>{
  console.log("bodyy->",req.body);
  const { userCode } = req.body;
  const Submisison=await Submissions.findById(req.body.submissionId);
  if(!Submisison)
     return res.json(404).send({error:true,message:"Invalid submission!"});
  const Program=await Programs.findOne({contestId:Submisison.contest});
  const testCases=Program.test_cases;
  console.log("TEST CASES-->",testCases);
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
}