import "./globals.css"
import { WagmiProvider } from "wagmi"
import { wagmiConfig } from "../lib/wagmi"

export const metadata = {
  title: "B Side Staking",
  description: "Stake your NFTs and earn $HONEY",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
      </body>
    </html>
  )
}
