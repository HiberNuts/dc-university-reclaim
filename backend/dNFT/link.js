const { ThirdwebSDK } = require("@thirdweb-dev/sdk");
// const { sharde } = require("@thirdweb-dev/chains");
const abi = require("./abi.json");

// exports.MintPOLNft = async ({ walletAddress, contractAddress }) => {
const main = async () => {
  const CLIENT_ID = process.env.CLIENT_ID;
  const SECRET_KEY = process.env.SECRET_KEY;
  // const PRIVATE_KEY = process.env.PRIVATE_KEY;
  const PRIVATE_KEY = "f9c365bb92079cb504d156960da24697ba9c4345f855fb2b143850e4eebe22fd";
  // console.log("Contract", contractAddress);

  // const toAddress = walletAddress;
  const CONTRACT_ADDRESS = "0x7Bd639B51A5C5EFDfc7CA5309005F3e01CD8563F";

  const toAddress = "0x53EC7AaB4dbEC2b0912577E549758615A08cb172";
  const _uri = "ipfs://QmdwaiAzpZP3cDZHCqcs9A6yAHMtP67KdfMeYEdEDBBrho";

  const sdk = ThirdwebSDK.fromPrivateKey(
    PRIVATE_KEY,
    {
      chainId: 8081, // Chain ID of the network
      rpc: ["https://dapps.shardeum.org"],

      nativeCurrency: {
        decimals: 18,
        name: "Shardeum SHM",
        symbol: "SHM",
      },
      shortName: "shardeum-sphinx-dapp", // Display value shown in the wallet UI
      slug: "shardeum-sphinx-dapp", // Display value shown in the wallet UI
      testnet: true, // Boolean indicating whether the chain is a testnet or mainnet
      chain: "	Shardeum Sphinx Dapp 1.X", // Name of the network
      name: "	Shardeum Sphinx Dapp 1.X", // Name of the network
    },
    {
      secretKey: SECRET_KEY, // Use secret key if using on the server, get it from dashboard settings
    }
  );

  token_abi = abi;

  const contract = await sdk.getContract(
    CONTRACT_ADDRESS, // The address of your smart contract
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

main();
