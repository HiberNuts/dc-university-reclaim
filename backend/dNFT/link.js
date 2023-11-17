import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { Shardeum } from "@thirdweb-dev/chains";
import { abi } from "./abi";

exports.main = async () => {
  CLIENT_ID = process.env.CLIENT_ID;
  SECRET_KEY = process.env.SECRET_KEY;

  const toAddress = "";
  const _uri = "";

  const sdk = ThirdwebSDK.fromPrivateKey(
    process.env.PRIVATE_KEY, // Your wallet's private key (only required for write operations)
    Shardeum,
    {
      clientId: CLIENT_ID, // Use client id if using on the client side, get it from dashboard settings
      secretKey: SECRET_KEY, // Use secret key if using on the server, get it from dashboard settings
    }
  );

  token_abi = abi.abi;

  const contract = await sdk.getContract(
    "0x4E46DD8a4Fc60cA0F93bF34b31c85126EDeFbd75", // The address of your smart contract
    token_abi // The ABI of your smart contract
  );

  const mintNFT = await contract.call(
    "safeMint", // Name of your function as it is on the smart contract
    // Arguments to your function, in the same order they are on your smart contract
    [
      toAddress, // e.g. Argument 2
    ]
  );

  const setURI = await contract.call(
    "setURI", // Name of your function as it is on the smart contract
    // Arguments to your function, in the same order they are on your smart contract
    [
      _uri, // e.g. Argument 2
    ]
  );
};
