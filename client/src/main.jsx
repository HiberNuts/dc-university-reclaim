import "./init";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { publicProvider } from "wagmi/providers/public";
import {
  injectedWallet,
  rainbowWallet,
  walletConnectWallet,
  // talismanWallet,
  metaMaskWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { WagmiConfig, configureChains, createConfig, createStorage } from "wagmi";
import { mainnet, optimism, zora, polygon, polygonMumbai, goerli } from "wagmi/chains";
import { RainbowKitProvider, connectorsForWallets, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { InjectedConnector } from "@wagmi/core";
import "@rainbow-me/rainbowkit/styles.css";
import { ParentProvider } from "./contexts/ParentContext";
import { PolybaseProvider } from "@polybase/react";
import { Polybase } from "@polybase/client";
import ScrollToTop from "./ScrollToTop";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, goerli, polygonMumbai, polygon],
  [alchemyProvider({ apiKey: "7wSu45FYTMHUO4HJkHjQwX4HFkb7k9Ui" }), publicProvider()]
);

const projectId = "b2024bb978e05dbfcd98d3ca8318ee07";

const polybase = new Polybase();

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
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
  storage: createStorage({ storage: window.localStorage }),
  // connectors: publicClient,
});


ReactDOM.createRoot(document.getElementById("root")).render(
  <WagmiConfig config={wagmiEntity}>
    <RainbowKitProvider chains={chains}>
      <ParentProvider>
        <BrowserRouter>
          <PolybaseProvider polybase={polybase}>
            <ScrollToTop />
            <App />
          </PolybaseProvider>
        </BrowserRouter>
      </ParentProvider>
    </RainbowKitProvider>
  </WagmiConfig>
);
