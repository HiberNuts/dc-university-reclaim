import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import {
  walletConnectWallet,
  metaMaskWallet,
  phantomWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig, createStorage, WagmiConfig } from "wagmi";
import { mainnet, polygon } from "wagmi/chains";
import { RainbowKitProvider, connectorsForWallets, darkTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { ParentProvider } from "./contexts/ParentContext";
import ScrollToTop from "./ScrollToTop";
import { AuthProvider } from "@arcana/auth";
import { publicProvider } from "wagmi/providers/public";


const projectId = import.meta.env.VITE_WC_PROJECT_ID;
const arcanaClientId = import.meta.env.VITE_ARCANA_CLIENT_ID;

const { chains, publicClient } = configureChains(
  [mainnet, polygon],
  [publicProvider()]
);



const getAuthProvider = () => {
  if (!auth) {
    auth = new AuthProvider(
      arcanaClientId
    );
  }
  return auth;
};





const connectors = connectorsForWallets(
  [
    {
      groupName: 'Wallets',
      wallets: [metaMaskWallet({ chains, projectId }), walletConnectWallet({ chains, projectId }), phantomWallet({ chains })],
    }
  ]
);

const config = createConfig({
  connectors: connectors,
  autoConnect: true,
  chains: chains,
  publicClient,
  storage: createStorage({ storage: window.localStorage }),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <WagmiConfig config={config}>
    <RainbowKitProvider chains={chains} modalSize="compact" theme={darkTheme()}>
      <ParentProvider>
        <BrowserRouter>
          <ScrollToTop />
          <App />
        </BrowserRouter>
      </ParentProvider>
    </RainbowKitProvider>

  </WagmiConfig>
);
