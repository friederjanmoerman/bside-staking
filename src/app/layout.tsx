import "@/globals.css"
import Web3Providers from "../components/Web3Providers"

export const metadata = {
  title: "B Side Staking",
  description: "Stake your NFTs and earn $HONEY",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Web3Providers>{children}</Web3Providers>
      </body>
    </html>
  )
}
