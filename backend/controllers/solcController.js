const solc = require('solc');
const { ethers, network } = require('hardhat');
const chai = require("chai");
const { expect } = require("chai");
const db = require("../models");
const User = require('../models/User');
const hre = require("hardhat");
const Programs = db.Programs;
const Submissions = db.Submissions;
const Contests = db.Contests;
const crypto = require('crypto');
const path = require('path');
const { exec } = require('child_process');
const { spawn } = require('child_process');
const util = require('util');
const fs = require('fs').promises;
const execPromise = util.promisify(exec);

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
        return res.status(200).send({
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



const TEMP_DIR = path.join(__dirname, 'temp');
const CACHE_DIR = path.join(__dirname, 'cache');
const PROJECT_ROOT = path.resolve(__dirname, '../');

async function ensureDirectoryExists(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (error) {
    console.error(`Error creating directory ${dir}:`, error);
  }
}

async function runCommand(command, options) {
  console.log(`Running command: ${command}`);
  console.log(`Working directory: ${options.cwd}`);

  try {
    const { stdout, stderr } = await execPromise(command, options);
    if (stderr) {
      console.error(`Command stderr: ${stderr}`);
    }
    return stdout;
  } catch (error) {
    if (error.stdout) {
      return error.stdout;
    }
    console.error(`Command failed: ${error.message}`);
    throw error;
  }
}

function parseTestResults(output) {
  const lines = output.split('\n');
  const testResults = [];
  const summary = {
    totalTests: 0,
    passedTests: 0,
    failedTests: 0,
    duration: '',
    compilationResult: '',
  };

  let currentTest = null;
  let capturingError = false;

  for (const line of lines) {
    if (line.includes('Compiled')) {
      summary.compilationResult = line.trim();
    } else if (line.trim().startsWith('✔')) {
      // Passed test
      const description = line.split('✔')[1].trim();
      testResults.push({
        description,
        passed: true,
        error: null
      });
      summary.passedTests++;
    } else if (line.trim().match(/^\d+\)/)) {
      // Failed test
      const description = line.split(')')[1].trim();
      currentTest = {
        description,
        passed: false,
        error: ''
      };
      testResults.push(currentTest);
      summary.failedTests++;

    } else if (line.match(/^\s+\d+ passing/)) {
      break;
      // Summary line for passing tests
      const [, , time] = line.match(/(\d+) passing \(([^)]+)\)/);
      summary.duration = time;
    }
  }

  summary.totalTests = summary.passedTests + summary.failedTests;

  return { testResults, summary };
}

exports.test = async (req, res) => {
  const { userCode, testFileContent } = req.body;

  if (!userCode || !testFileContent) {
    return res.status(400).json({ error: 'Missing userCode or testFileContent' });
  }

  const submissionId = crypto.randomBytes(16).toString('hex');
  const submissionDir = path.join(TEMP_DIR, submissionId);

  try {
    await ensureDirectoryExists(TEMP_DIR);
    await ensureDirectoryExists(CACHE_DIR);
    await ensureDirectoryExists(submissionDir);

    // Extract the contract name from the user's code
    const contractNameMatch = userCode.match(/contract\s+(\w+)/);
    if (!contractNameMatch) {
      return res.status(400).json({ error: 'Unable to determine contract name from the provided code' });
    }
    const contractName = contractNameMatch[1];

    // Write the user's contract to a file named after the contract
    const contractFileName = `${contractName}.sol`;
    await fs.writeFile(path.join(submissionDir, contractFileName), userCode);

    // Update the test file to use the correct contract name and import path
    let updatedTestContent = testFileContent.replace(/SimpleAuction/g, contractName);
    updatedTestContent = updatedTestContent.replace(
      /const \w+ = await ethers\.getContractFactory\("SimpleAuction"\)/,
      `const ${contractName} = await ethers.getContractFactory("${contractName}")`
    );
    await fs.writeFile(path.join(submissionDir, 'test.js'), updatedTestContent);

    const hardhatConfig = `
    require("@nomicfoundation/hardhat-toolbox");
    
    module.exports = {
      solidity: "0.8.24",
      paths: {
        sources: "./",
        tests: "./",
        cache: "${CACHE_DIR.replace(/\\/g, '\\\\')}"
      },
      networks: {
        hardhat: {
          chainId: 1337
        }
      }
    };
    `;
    await fs.writeFile(path.join(submissionDir, 'hardhat.config.js'), hardhatConfig);

    // await runCommand('npm install', { cwd: submissionDir });

    let result;
    try {
      result = await runCommand('npx hardhat test', { cwd: submissionDir });
    } catch (error) {
      console.error('Error running Hardhat tests:', error);
      result = error.stdout || error.message;
    }

    const parsedResults = parseTestResults(result);

    await fs.rm(submissionDir, { recursive: true, force: true });

    res.json(parsedResults);
  } catch (error) {
    console.error('Error processing submission:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}

exports.test2 = async (req, res) => {
  const { userCode = '', submissionId = '', testFileContent = '', isPreview = true, walletAddress = '', isCourse = false, user_id, course_id, program_id, module_id } = req.body;

  try {
    const path = require('path');
    const fs = require('fs');

    function findImports(importPath) {
      if (importPath.startsWith('@openzeppelin/')) {
        const parts = importPath.split('/');
        const fileName = parts[parts.length - 1];
        const fullPath = path.resolve(__dirname, '..', 'node_modules', '@openzeppelin', 'contracts', ...parts.slice(2));

        if (fs.existsSync(fullPath)) {
          return { contents: fs.readFileSync(fullPath, 'utf8') };
        } else {
          console.error(`File not found: ${fullPath}`);
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

    const contractNames = Object.keys(compiled.contracts['test.sol']);
    console.log('Contract Names', contractNames);

    const { ethers } = require('hardhat');
    // Set up Hardhat Network
    await hre.network.provider.send("hardhat_reset");
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
    const signer = await provider.getSigner()
    console.log("ADDRESS", signer);
    const factories = {};
    for (const contractName in compiled.contracts['test.sol']) {
      const abi = compiled.contracts['test.sol'][contractName].abi;
      const bytecode = compiled.contracts['test.sol'][contractName].evm.bytecode.object;
      factories[contractName] = await ethers.getContractFactory(abi, bytecode, signer);
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
            console.log("before each called");
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
    console.log(modifiedTestContent);
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


      (async () => {
        try {
          await testFunction(chai, ethers, expect, describe, it, beforeEach, afterEach, signer, network)();
        } catch (error) {
          console.error("An error occurred during test execution:", error);
        }
      })();


      await Promise.all(testPromises);
      //IF IT IS NOT FOR PREVIEW TESTING
      if (isPreview == false) {
        if (isCourse == true) {
          try {
            const user = await User.findById(user_id);
            if (!user) {
              return res.status(404).json({ error: true, message: "User not found" });
            }
            const enrolledCourse = user.enrolledCourses.find(
              course => course.courseId.toString() === course_id
            );
            if (!enrolledCourse) {
              return res.status(404).json({ error: true, message: "Enrolled course not found" });
            }
            const module = enrolledCourse.modules.find(
              mod => mod._id.toString() === module_id
            );
            if (!module) {
              return res.status(404).json({ error: true, message: "Module not found" });
            }

            // Calculate number of passing and failing tests
            const passedTests = results.filter(result => result.passed).length;
            const failedTests = results.length - passedTests;

            // Update the program status
            module.program.status = passedTests >= results.length / 2 ? "full" : "partial";
            module.programStatus = passedTests >= results.length / 2 ? "full" : "partial";
            module.status = passedTests >= results.length / 2 ? "full" : "partial";
            module.program.code = userCode;
            module.program.walletAddress = walletAddress;
            module.program.passedCases = passedTests;
            module.program.totalCases = results.length;
            module.program.testResults = results.map(result => ({
              passed: result.passed,
              description: result.description,
              error: result.error
            }));
            module.program.code = userCode;

            // Save the updated user document
            await user.save();

            console.log("Course submission updated");
            return res.json({ passedTests, failedTests, results });
          } catch (error) {
            console.error("Error updating course submission:", error);
            return res.status(500).json({ error: true, message: "Failed to update course submission", error });
          }

        } else {
          const Submisison = await Submissions.findById(submissionId);
          if (!Submisison)
            return res.json(404).send({ error: true, message: "Invalid submission!" });

          const Contest = await Contests.findById(Submisison.contest);
          const currentDate = new Date();
          const endDate = new Date(Contest.endDate);
          if (currentDate > endDate) {
            return res.status(200).json({ error: true, message: "Sorry. The Contest has ended!" });
          }
          // Calculate number of passing and failing tests
          const passedTests = results.filter(result => result.passed).length;
          const failedTests = results.length - passedTests;
          const xpForEachTestCase = 500 / results.length;
          const xpEarned = parseInt(xpForEachTestCase * passedTests).toFixed(0);
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
          return res.json({ passedTests, failedTests, results });
        }

      }
      console.log("Preview submission done[+]")
      return res.json({ results });
    } catch (error) {
      console.error("Error running tests:", error);
      res.status(200).json({ error: true, message: "Failed to run test cases: " + error.message });
    }
  } catch (error) {
    console.error(error);
    res.status(200).json({ error: true, message: error.message });
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
    const provider = ethers.provider;
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
    const xpForEachTestCase = 500 / testResults.length;
    const xpEarned = parseInt(xpForEachTestCase * passedTests).toFixed(0);
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