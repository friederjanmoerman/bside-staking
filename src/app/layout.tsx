import React from 'react'
import type { Metadata } from 'next'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'

import './styles/globals.css'

import { WalletProvider } from './context/WalletContext' // Import WalletProvider

import Navbar from '../components/Navbar'

const metadata: Metadata = {
  title: 'Staking Platform',
  description: 'Connect and stake NFTs using Keplr wallet.',
}

export { metadata }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WalletProvider>
          <AppRouterCacheProvider>
            <Navbar />
            {children}
          </AppRouterCacheProvider>
        </WalletProvider>
      </body>
    </html>
  )
}
