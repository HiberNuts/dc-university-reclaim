// import { ThirdwebSDK } from "@thirdweb-dev/sdk";
// import { Shardeum } from "@thirdweb-dev/chains";
// import { abi } from "./abi.json";
const { ThirdwebSDK } = require("@thirdweb-dev/sdk");
const { Mumbai } = require("@thirdweb-dev/chains");
const abi = require("./abi.json");

const main = async () => {
  const CLIENT_ID = "2b3bf217784412a2432bff944b7c3118";
  const SECRET_KEY = "FoB0lMh763eNFt7bV0u2CGGc76LxIhb4xjl1Un_jmthuu5hVIpcejhig9_Y29YUrDMJPyO1a4mNLTMQjmnPYGg";

  const toAddress = "0x72FdC25331Cd34579c5Dd8DbbABe0a38cdCcb97F";
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
    "0xd9145CCE52D386f254917e481eB44e9943F39138", // The address of your smart contract
    token_abi // The ABI of your smart contract
  );

  const mintNFT = async () => {
    const result = await contract.call(
      "safeMint", // Name of your function as it is on the smart contract
      // Arguments to your function, in the same order they are on your smart contract
      [
        toAddress, // e.g. Argument 2
      ]
    );
    console.log(result);
  };

  const set = async () => {
    const setURI = await contract.call(
      "setBaseURI", // Name of your function as it is on the smart contract
      // Arguments to your function, in the same order they are on your smart contract
      [
        _uri, // e.g. Argument 2
      ]
    );
    console.log(setURI);
  };

  mintNFT();
  // set();
};

main();
