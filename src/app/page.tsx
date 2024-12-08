'use client'

import React from 'react'
import { Box, Typography } from '@mui/material'

export default function HomePage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5', // Background color
        padding: 3,
      }}
    >
      <Typography variant="h6" color="black" gutterBottom>
        Connect your wallet and manage your B Side NFTs with bease.
      </Typography>
    </Box>
  )
}
