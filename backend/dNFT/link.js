const { ThirdwebSDK } = require("@thirdweb-dev/sdk");
const abi = require("./abi.json");
const cc = require("node-console-colors");

process.on('uncaughtException', function (error) {
  console.log(cc.set("fg_yellow", "Crashable UnHandled Exception", error.stack));
});
process.on('unhandledRejection', (reason, promise) => {
  console.log(cc.set("fg_yellow", 'Crashable UnHandled Rejection', reason.stack || reason));
  // Recommended: send the information to sentry.io
})
const MintPOLNft = async ({ walletAddress, contractAddress }) => {
  const CLIENT_ID = process.env.CLIENT_ID;
  const SECRET_KEY = process.env.SECRET_KEY;
  // const PRIVATE_KEY = process.env.PRIVATE_KEY;
  const PRIVATE_KEY = "f9c365bb92079cb504d156960da24697ba9c4345f855fb2b143850e4eebe22fd";
  console.log("Contract", contractAddress);

  const toAddress = walletAddress;
  // const CONTRACT_ADDRESS = "0x7Bd639B51A5C5EFDfc7CA5309005F3e01CD8563F";

  // const toAddress = "0x53EC7AaB4dbEC2b0912577E549758615A08cb172";

  const sdk = ThirdwebSDK.fromPrivateKey(
    PRIVATE_KEY,
    {
      chainId: 8082, // Chain ID of the network
      rpc: ["https://sphinx.shardeum.org"],

      nativeCurrency: {
        decimals: 18,
        name: "Shardeum SHM",
        symbol: "SHM",
      },
      shortName: "Shardeum-sphinx-validator", // Display value shown in the wallet UI
      slug: "Shardeum-sphinx-validator", // Display value shown in the wallet UI
      testnet: true, // Boolean indicating whether the chain is a testnet or mainnet
      chain: "Shardeum Sphinx Validator 1.X", // Name of the network
      name: "Shardeum Sphinx Validator 1.X", // Name of the network
    },
    {
      secretKey: "f9s9BBFdMtcNUApS6ARsj0qLjITxy7V7vl6GeJDRp0MLCYzzKEkQNZ93BE2jtUvQXgubCOhVMcycnEVSxPGoNg", // Use secret key if using on the server, get it from dashboard settings
    }
  );
  token_abi = abi;

  const contract = await sdk.getContract(
    contractAddress, // The address of your smart contract
    token_abi // The ABI of your smart contract
  );

  const result = await contract.call(
    "safeMint", // Name of your function as it is on the smart contract
    // Arguments to your function, in the same order they are on your smart contract
    [
      toAddress, // e.g. Argument 2
    ]
  );

  console.log(result);
  return result;
};

const mint = async () => {
  for (let index = 0; index < 2; index++) {
    try {
      console.log("-------------------------------->")
      await MintPOLNft({ walletAddress: "0x53EC7AaB4dbEC2b0912577E549758615A08cb172", contractAddress: "0x58dad51baf2069b4e1b3f42924880c961654e3ea" })
      console.log("-------------------------------->")
    } catch (error) {
      console.log(error)
      continue
    }

  }
}

// mint()