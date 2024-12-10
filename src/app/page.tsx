'use client'

import React, { useEffect, useState } from 'react'
import { Box, Typography, CircularProgress, Button } from '@mui/material'
import { useWallet } from './context/WalletContext' // Import useWallet hook

import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const HomePage = () => {
  const { address, connectWallet } = useWallet() // Use wallet context
  const [loading, setLoading] = useState(false)
  const [nfts, setNfts] = useState<any[]>([]) // Store NFTs here

  useEffect(() => {
    if (address) {
      fetchNfts(address) // Fetch NFTs when address is available
    }
  }, [address])

  console.log('address: ' + address)

  // Function to fetch NFTs owned by the wallet
  const fetchNfts = async (walletAddress: string) => {
    try {
      setLoading(true)
      const fetchedNfts = await getNftsOwnedByAddress(walletAddress)
      setNfts(fetchedNfts)
    } catch (error) {
      console.error('Error fetching NFTs:', error)
      alert('Failed to fetch NFTs.')
    } finally {
      setLoading(false)
    }
  }

  const rpcEndpoint = 'https://sentry.tm.injective.network:443'
  const contractAddress = 'inj18p94d9gnrhqu7mrfpcvh6tvja2d207y6qd224s' // Replace with target contract

  const getNftsOwnedByAddress = async (address: string, limit = 50) => {
    try {
      const client = await CosmWasmClient.connect(rpcEndpoint)
      let allTokens: string[] = []
      let startAfter = null
      let hasMore = true

      while (hasMore) {
        // Define the query
        const query = {
          tokens: {
            owner: address,
            start_after: startAfter,
            limit: limit,
          },
        }

        console.log('Query:', JSON.stringify(query, null, 2))

        // Query the contract
        const result = await client.queryContractSmart(contractAddress, query)

        // Extract tokens and update state
        const tokens = result.ids || [] // Adjust key if needed
        allTokens = [...allTokens, ...tokens]

        // Check if there are more tokens (pagination check)
        hasMore = tokens.length === limit
        startAfter = tokens[tokens.length - 1]

        console.log('Next startAfter:', startAfter)

        // Add a delay to prevent overloading the network
        await delay(2000) // Increased delay to handle rate limits
      }

      console.log('All Tokens:', allTokens)
      return allTokens
    } catch (error) {
      console.error('Error querying contract:', error)
      throw new Error('Failed to fetch NFTs')
    }
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
                <li key={index}>{nft.title || nft}</li>
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
