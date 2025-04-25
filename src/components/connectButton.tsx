"use client"

import { useAccount, useConnect, useDisconnect, useChainId, useSwitchChain } from "wagmi"

export default function ConnectButton() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const chainId = useChainId()
  const { switchChain } = useSwitchChain()

  const isOnBerachain = chainId === 80085

  if (!isConnected) {
    return <button onClick={() => connect({ connector: connectors[0] })}>Connect Wallet</button>
  }

  if (!isOnBerachain) {
    return <button onClick={() => switchChain?.({ chainId: 80085 })}>Switch to Berachain</button>
  }

  return (
    <div>
      <p>
        Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
      </p>
      <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  )
}
