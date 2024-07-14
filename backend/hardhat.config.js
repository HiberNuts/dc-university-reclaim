require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      gas: 12000000,
      blockGasLimit: 0x1fffffffffffff,
      allowUnlimitedContractSize: true,
      timeout: 1800000,
      mining: {
        auto: true,
        interval: 0
      }

    },
  },
  // networks: {
  //   goerli: {
  //     url: `${process.env.ALCHEMY_GOERLI_URL}`,
  //     accounts: [`0x${process.env.GOERLI_PRIVATE_KEY}`],
  //   }
  // }
};