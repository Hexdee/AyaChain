'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { Chain, configureChains, createConfig, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

export const calibrationnet = {
  id: 314_159,
  name: 'Filecoin - Calibration testnet',
  network: 'calibrationnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Filecoin testnet token',
    symbol: 'tFIL',
  },
  rpcUrls: {
    public: { http: ['https://api.calibration.node.glif.io/rpc/v1', 'https://filecoin-calibration.chainup.net/rpc/v1', 'https://rpc.ankr.com/filecoin_testnet', 'https://filecoin-calibration.chainup.net/rpc/v1', 'https://api.calibration.node.glif.io/rpc/v1'] },
    default: { http: ['https://api.calibration.node.glif.io/rpc/v1', 'https://filecoin-calibration.chainup.net/rpc/v1', 'https://rpc.ankr.com/filecoin_testnet', 'https://filecoin-calibration.chainup.net/rpc/v1', 'https://api.calibration.node.glif.io/rpc/v1'] },
  },
  blockExplorers: {
    etherscan: { name: 'FilScan', url: 'https://calibration.filscan.io' },
    default: { name: 'FilScan', url: 'https://calibration.filscan.io' },
  },
} as const satisfies Chain

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    calibrationnet,
  ],
  [publicProvider()]
);


const { connectors } = getDefaultWallets({
  appName: 'Ayachain',
  projectId: '9904ebb190195acdcc552c331c1a8087',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function WalletProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default WalletProvider;
