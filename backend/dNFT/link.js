const { ThirdwebSDK } = require("@thirdweb-dev/sdk");
// const { sharde } = require("@thirdweb-dev/chains");
const abi = require("./abi.json");

exports.MintPOLNft = async ({ walletAddress }) => {
  const CLIENT_ID = process.env.CLIENT_ID;
  const SECRET_KEY = process.env.SECRET_KEY;

  const toAddress = walletAddress;
  const _uri = "ipfs://QmdwaiAzpZP3cDZHCqcs9A6yAHMtP67KdfMeYEdEDBBrho";

  const sdk = ThirdwebSDK.fromPrivateKey(
    "f9c365bb92079cb504d156960da24697ba9c4345f855fb2b143850e4eebe22fd", // Your wallet's private key (only required for write operations)
    "mumbai",
    {
      clientId: CLIENT_ID, // Use client id if using on the client side, get it from dashboard settings
      secretKey: SECRET_KEY, // Use secret key if using on the server, get it from dashboard settings
    }
  );

  token_abi = abi;

  const contract = await sdk.getContract(
    "0x16032aEdEb8683Dd6d881a5396E62EE069Fa068b", // The address of your smart contract
    token_abi // The ABI of your smart contract
  );

  const result = await contract.call(
    "safeMint", // Name of your function as it is on the smart contract
    // Arguments to your function, in the same order they are on your smart contract
    [
      toAddress, // e.g. Argument 2
    ]
  );
  return result;

  // const set = async () => {
  //   const setURI = await contract.call(
  //     "setBaseURI", // Name of your function as it is on the smart contract
  //     // Arguments to your function, in the same order they are on your smart contract
  //     [
  //       _uri, // e.g. Argument 2
  //     ]
  //   );
  //   console.log(setURI);
  // };

  // mintNFT();
  // set();
};
