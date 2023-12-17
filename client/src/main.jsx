import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { publicProvider } from "wagmi/providers/public";
import {
  rainbowWallet,
  walletConnectWallet,
  // talismanWallet,
  metaMaskWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { mainnet, polygon, polygonMumbai, goerli, shardeumSphinx } from "wagmi/chains";
import { RainbowKitProvider, connectorsForWallets, darkTheme } from "@rainbow-me/rainbowkit";
import { alchemyProvider } from "wagmi/providers/alchemy";
import "@rainbow-me/rainbowkit/styles.css";
import { ParentProvider } from "./contexts/ParentContext";
import ScrollToTop from "./ScrollToTop";

const { chains, publicClient } = configureChains(
  [mainnet, goerli, polygonMumbai, polygon, shardeumSphinx],
  [alchemyProvider({ apiKey: "7wSu45FYTMHUO4HJkHjQwX4HFkb7k9Ui" }), publicProvider()]
);

// const projectId = "b2024bb978e05dbfcd98d3ca8318ee07";
const projectId = "5158325ee44f36fbacaa99525e8c0ab8";

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      rainbowWallet({ projectId, chains }),
      walletConnectWallet({ projectId, chains }),
      metaMaskWallet({ chains, projectId }),
    ],
  },
]);

const wagmiEntity = createConfig({
  connectors: connectors(chains),
  autoConnect: true,
  publicClient,
});
// const wagmiConfig = createConfig({
//   autoConnect: true,
//   connectors,
//   publicClient,
//   webSocketPublicClient,
//   storage: createStorage({ storage: window.localStorage }),
//   // connectors: publicClient,
// });

const Disclaimer = ({ Text, Link }) => (
  <Text>
    By connecting your wallet, you agree to the <Link href="https://shardeum.org">Terms of Service</Link> and
    acknowledge you have read and understand the protocol <Link href="https://shardeum.org">Disclaimer</Link>
  </Text>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <WagmiConfig config={wagmiEntity}>
    <RainbowKitProvider
      theme={darkTheme({
        accentColor: "#ff8743",
        accentColorForeground: "white",
        borderRadius: "medium",
      })}
      modalSize="compact"
      appInfo={{
        appName: "Shardeum",
        disclaimer: Disclaimer,
      }}
      chains={chains}
    >
      <ParentProvider>
        <BrowserRouter>
          <ScrollToTop />
          <App />
        </BrowserRouter>
      </ParentProvider>
    </RainbowKitProvider>
  </WagmiConfig>
);
