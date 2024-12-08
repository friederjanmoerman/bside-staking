'use client'

import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, Button, Box, CircularProgress } from '@mui/material'
import { useWallet } from './../app/context/WalletContext' // Import useWallet hook

const Navbar: React.FC = () => {
  const { address, connectWallet } = useWallet() // Use wallet context
  const [loading, setLoading] = useState(false)

  const handleConnectWallet = async () => {
    setLoading(true)
    await connectWallet() // Call the connectWallet function from context
    setLoading(false)
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1e293b' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Staking Platform
        </Typography>
        <Box>
          {loading ? (
            <CircularProgress color="inherit" />
          ) : (
            <Button variant="contained" color="primary" onClick={handleConnectWallet}>
              {address ? `Connected: ${address.slice(0, 6)}...` : 'Connect Wallet'}
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
