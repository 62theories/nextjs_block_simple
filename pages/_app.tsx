import { Provider, Connector } from "wagmi";
import { Chain } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import "../styles/globals.css";
import { providers } from "ethers";

type ConnectorsConfig = { chainId?: number };

export type WssURI = {
  wss: string;
};

type ProviderConfig = { chainId?: number; connector?: Connector };

export const mainnet: Chain & WssURI = {
  id: 1,
  name: "Mainnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: [
    process.env.ALCHEMY_ID
      ? process.env.ALCHEMY_ID
      : "https://mainnet.infura.io/v3",
  ],
  blockExplorers: [{ name: "Etherscan", url: "https://etherscan.io" }],
  wss: "wss://eth-rinkeby.alchemyapi.io/v2/UuZaRWkN8i9K1_RvrtssdRaRn6MTZ49_",
};

export const rinkeby: Chain & WssURI = {
  id: 4,
  name: "Rinkeby",
  nativeCurrency: { name: "Rinkeby Ether", symbol: "rETH", decimals: 18 },
  rpcUrls: [
    process.env.ALCHEMY_ID
      ? process.env.ALCHEMY_ID
      : "https://eth-rinkeby.alchemyapi.io/v2/UuZaRWkN8i9K1_RvrtssdRaRn6MTZ49_",
  ],
  blockExplorers: [{ name: "Etherscan", url: "https://rinkeby.etherscan.io" }],
  testnet: true,
  wss: "wss://eth-rinkeby.alchemyapi.io/v2/UuZaRWkN8i9K1_RvrtssdRaRn6MTZ49_",
};

export const bsc: Chain = {
  id: 56,
  name: "Binance Smart Chain",
  nativeCurrency: { name: "Binance Coin", symbol: "BNB", decimals: 18 },
  rpcUrls: [
    "https://bsc-dataseed.binance.org/",
    "https://bsc-dataseed1.defibit.io/",
    "https://bsc-dataseed1.ninicoin.io/",
  ],
  blockExplorers: [
    {
      name: "bscscan",
      url: "https://bscscan.com",
    },
  ],
  testnet: true,
};

export const bscTestnet: Chain = {
  id: 97,
  name: "BSC Testnet",
  nativeCurrency: { name: "Binance Coin", symbol: "BNB", decimals: 18 },
  rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
  blockExplorers: [
    {
      name: "testnet.bscscan",
      url: "https://testnet.bscscan.com",
    },
  ],
  testnet: true,
};

export const bkc: Chain = {
  id: 96,
  name: "BKC",
  nativeCurrency: { name: "Bitkub Coin", symbol: "KUB", decimals: 18 },
  rpcUrls: ["https://rpc.bitkubchain.io"],
  blockExplorers: [
    {
      name: "bkcscan",
      url: "https://bkcscan.com",
    },
  ],
  testnet: false,
};

export const bkcTestnet: Chain = {
  id: 25925,
  name: "BKC Testnet",
  nativeCurrency: { name: "Bitkub Coin", symbol: "KUB", decimals: 18 },
  rpcUrls: ["https://rpc-testnet.bitkubchain.io"],
  blockExplorers: [
    {
      name: "testnet.bkcscan",
      url: "https://testnet.bkcscan.com",
    },
  ],
  testnet: true,
};

export const getChains = () => {
  let chains: Chain[] = [rinkeby, bscTestnet, bkcTestnet];
  let defaultChain: Chain = rinkeby;

  let payDefaultChain: Chain = bscTestnet;
  let payChainSupported: Chain[] = [rinkeby, bscTestnet];

  let managerDefaultChain: Chain = bkcTestnet;
  let managerChainSupported: Chain[] = [bkcTestnet];

  let cashierDefaultChain: Chain = rinkeby;
  let cashierChainSupported: Chain[] = [rinkeby];

  let dealerDefaultChain: Chain = bkcTestnet;
  let dealerChainSupported: Chain[] = [bkcTestnet];

  return {
    chains,
    defaultChain,
    payDefaultChain,
    payChainSupported,
    managerDefaultChain,
    managerChainSupported,
    cashierDefaultChain,
    cashierChainSupported,
    dealerDefaultChain,
    dealerChainSupported,
  };
};

let { chains, defaultChain } = getChains();

const connectors = ({ chainId }: ConnectorsConfig) => {
  return [
    new InjectedConnector({
      chains,
      options: { shimDisconnect: true },
    }),
    // new WalletConnectConnector({
    //   chains,
    //   options: {
    //     // infuraId: data.ENV.INFURA_ID,
    //     qrcode: true,
    //   },
    // }),
  ];
};

const provider = ({ chainId }: ProviderConfig) => {
  if (chainId) {
    return new providers.Web3Provider(window.ethereum as any);
  }
  return new providers.JsonRpcProvider(defaultChain.rpcUrls[0]);
};

function MyApp({ Component, pageProps }) {
  return (
    <Provider autoConnect connectors={connectors} provider={provider}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
