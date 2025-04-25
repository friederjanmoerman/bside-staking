"use client"

import { useConnect, useAccount, useDisconnect, useChainId, useSwitchChain } from "wagmi"
import { Button, Stack, Typography, CircularProgress } from "@mui/material"

export default function ConnectButton() {
  // Grab everything we need from wagmi
  const { connect, connectors, status } = useConnect()
  const { isConnected, address } = useAccount()
  const { disconnect } = useDisconnect()
  const chainId = useChainId()
  const { switchChain } = useSwitchChain()

  const isOnBerachain = chainId === 80085

  // If the hook is in “connecting” state, show a spinner
  const isConnecting = status === "pending"

  return (
    <Stack spacing={2}>
      {!isConnected ? (
        connectors.map(connector => (
          <Button
            key={connector.id}
            variant="contained"
            color="primary"
            onClick={() => connect({ connector })}
            startIcon={isConnecting && <CircularProgress size={16} />}
          >
            {connector.name}
          </Button>
        ))
      ) : (
        <>
          <Typography variant="body2" color="text.secondary">
            Connected: {address?.slice(0, 6)}…{address?.slice(-4)}
          </Typography>

          {!isOnBerachain ? (
            <Button variant="outlined" color="warning" onClick={() => switchChain?.({ chainId: 80085 })}>
              Switch to Berachain
            </Button>
          ) : (
            <Button variant="contained" color="error" onClick={() => disconnect()}>
              Disconnect
            </Button>
          )}
        </>
      )}
    </Stack>
  )
}
