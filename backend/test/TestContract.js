
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

  
  it("should set value to 42", async function () {
    await contract.setValue(42);const value = await contract.getValue();expect(value).to.equal(41);
  });
  

  it("should set value to 100", async function () {
    await contract.setValue(100);const value = await contract.getValue();expect(value).to.equal(100);
  });
  

  it("should get initial value as 0", async function () {
    const value = await contract.getValue(); expect(value).to.equal(0);
  });
  
});
  