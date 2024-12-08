'use client' // Mark this file as a client component

import React from 'react'
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'

const Navbar: React.FC = () => {
  const handleConnectWallet = () => {
    if (window.keplr) {
      try {
        window.keplr.enable('cosmoshub-4')
        const offlineSigner = window.keplr.getOfflineSigner('cosmoshub-4')
        offlineSigner.getAccounts().then((accounts) => {
          alert(`Connected to Keplr: ${accounts[0].address}`)
        })
      } catch (error) {
        alert('Failed to connect wallet: ' + error.message)
      }
    } else {
      alert('Keplr Wallet is not installed. Please install it to connect.')
    }
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1e293b' }}>
      <Toolbar>
        {/* Logo Section */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Staking Platform
        </Typography>

        {/* Right-Aligned Navigation Items */}
        <Box>
          <Button variant="contained" color="primary" onClick={handleConnectWallet}>
            Connect Wallet
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
