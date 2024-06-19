const util = require('util');  // Import the util module
const exec = util.promisify(require('child_process').exec);
const solc = require('solc');
const { ethers } = require('hardhat');

const fs = require('fs');
const path = require('path');


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
    if (output.errors) {
      res.json({ error: output.errors[0] })
    }
    console.log("Cmpiled->>", output);
    for (var contractName in output.contracts['test.sol']) {
      console.log(
        contractName +
        ': ' +
        output.contracts['test.sol'][contractName].evm.bytecode.object
      );
    }
    res.status(200).send(output)
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