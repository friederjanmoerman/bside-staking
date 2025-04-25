import { createConfig, http } from "wagmi"
import { defineChain } from "viem"

export const berachain = defineChain({
  id: 80085,
  name: "Berachain Artio",
  nativeCurrency: {
    name: "Berachain",
    symbol: "BERA",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://artio.rpc.berachain.com"],
    },
  },
  blockExplorers: {
    default: { name: "Beratrail", url: "https://artio.beratrail.io" },
  },
  testnet: true,
})

export const wagmiConfig = createConfig({
  chains: [berachain],
  transports: {
    [berachain.id]: http(),
  },
})
