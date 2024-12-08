'use client'

import React, { createContext, useContext, useState } from 'react'

interface WalletContextType {
  address: string | null
  connectWallet: () => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(null)

  const connectWallet = async () => {
    if (window.getOfflineSigner && window.keplr) {
      try {
        // Enable Keplr Wallet for Injective
        await window.keplr.enable('injective-1')

        // Get the offline signer (for interacting with Injective)
        const offlineSigner = window.getOfflineSigner('injective-1')

        // Get the wallet's address
        const accounts = await offlineSigner.getAccounts()
        setAddress(accounts[0].address)
      } catch (error) {
        console.error('Error connecting wallet:', error)
        alert(
          'Failed to connect wallet. Make sure Keplr is installed and the Injective network is enabled.',
        )
      }
    } else {
      alert('Keplr wallet is not installed. Please install Keplr to continue.')
    }
  }

  return (
    <WalletContext.Provider value={{ address, connectWallet }}>{children}</WalletContext.Provider>
  )
}

export const useWallet = () => {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}
