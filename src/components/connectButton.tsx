// src/components/ConnectButton.tsx
"use client"

import { useConnect, useAccount, useDisconnect, useChainId, useSwitchChain } from "wagmi"
import { Button, Stack, Typography } from "@mui/material"

export default function ConnectButton() {
  const { connect, connectors } = useConnect()
  const { isConnected, address } = useAccount()
  const { disconnect } = useDisconnect()
  const chainId = useChainId()
  const { switchChain } = useSwitchChain()

  const isOnBerachain = chainId === 80085

  return (
    <Stack spacing={2}>
      {!isConnected ? (
        connectors.map(connector => (
          <Button
            key={connector.id}
            variant="contained"
            color="primary"
            onClick={() => connect({ connector })}
            disabled={!connector.ready || Boolean(connector.connecting)}
          >
            {connector.name}
            {connector.connecting && " (connecting...)"}
            {!connector.ready && " (unsupported)"}
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
