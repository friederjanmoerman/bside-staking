'use client'

import React, { useEffect, useState } from 'react'
import { Box, Typography, CircularProgress, Button } from '@mui/material'
import { useWallet } from './context/WalletContext' // Import useWallet hook

const HomePage = () => {
  const { address, connectWallet } = useWallet() // Use wallet context
  const [loading, setLoading] = useState(false)
  const [nfts, setNfts] = useState<any[]>([]) // Store NFTs here

  useEffect(() => {
    if (address) {
      fetchNfts(address) // Fetch NFTs when address is available
    }
  }, [address])

  // Function to fetch NFTs owned by the wallet
  const fetchNfts = async (walletAddress: string) => {
    try {
      const nfts = await getNftsOwnedByAddress(walletAddress)
      setNfts(nfts)
    } catch (error) {
      console.error('Error fetching NFTs:', error)
      alert('Failed to fetch NFTs.')
    }
  }

  // Placeholder: Replace with actual logic to fetch NFTs from the Talis collection
  const getNftsOwnedByAddress = async (address: string) => {
    return [
      { title: 'NFT 1', tokenId: '1' },
      { title: 'NFT 2', tokenId: '2' },
    ]
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        padding: 3,
      }}
    >
      <Typography variant="h6" color="black" gutterBottom>
        Connect your wallet and manage your B Side NFTs with bease.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={connectWallet} // Use context to connect wallet
        sx={{ marginBottom: 2 }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Connect Wallet'}
      </Button>

      {address && (
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6">Connected Wallet: {address}</Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            NFTs Owned:
          </Typography>
          {nfts.length > 0 ? (
            <ul>
              {nfts.map((nft, index) => (
                <li key={index}>{nft.title}</li>
              ))}
            </ul>
          ) : (
            <Typography>No NFTs found</Typography>
          )}
        </Box>
      )}
    </Box>
  )
}

export default HomePage
