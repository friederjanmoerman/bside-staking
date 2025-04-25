import { createConfig, http } from "wagmi"
import { defineChain } from "viem"
import { injected, walletConnect } from "wagmi/connectors"

export const berachain = defineChain({
  id: 80085,
  name: "Berachain Artio",
  network: "berachain",
  nativeCurrency: { name: "Berachain", symbol: "BERA", decimals: 18 },
  rpcUrls: { default: { http: ["https://artio.rpc.berachain.com"] } },
  blockExplorers: { default: { name: "Beratrail", url: "https://artio.beratrail.io" } },
  testnet: true,
})

export const wagmiConfig = createConfig({
  chains: [berachain],
  transports: {
    [berachain.id]: http(),
  },
  multiInjectedProviderDiscovery: false,
  connectors: [
    injected({
      shimDisconnect: true,
    }),

    walletConnect({
      projectId: "8cf70059b18374992e7c5c9ef3fabf03",
      showQrModal: true,
      metadata: {
        name: "B Side App Test",
        description: "Stake your NFTs to earn $HONEY",
        url: "http://localhost:3001. ",
        icons: ["http://localhost:3001/favicon.ico"],
      },
    }),
  ],
})
