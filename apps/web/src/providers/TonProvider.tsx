'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface TonWallet {
  address?: string;
  balance?: string;
  connected: boolean;
}

interface TonContextType {
  wallet: TonWallet;
  connect: () => Promise<void>;
  disconnect: () => void;
  isConnecting: boolean;
}

const TonContext = createContext<TonContextType | undefined>(undefined)

export function useTonWallet() {
  const context = useContext(TonContext)
  if (context === undefined) {
    throw new Error('useTonWallet must be used within a TonProvider')
  }
  return context
}

interface TonProviderProps {
  children: ReactNode;
}

export function TonProvider({ children }: TonProviderProps) {
  const [wallet, setWallet] = useState<TonWallet>({
    connected: false
  })
  const [isConnecting, setIsConnecting] = useState(false)

  const connect = async () => {
    try {
      setIsConnecting(true)
      
      // Ovde bi trebalo implementirati pravu TON wallet konekciju
      // Za sada simuliramo konekciju
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setWallet({
        address: 'EQD...mock-address',
        balance: '100.0',
        connected: true
      })
    } catch (error) {
      console.error('Failed to connect wallet:', error)
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnect = () => {
    setWallet({
      connected: false
    })
  }

  useEffect(() => {
    // Proveri da li je wallet već povezan
    const checkConnection = async () => {
      // Implementiraj logiku za proveru postojeće konekcije
    }
    
    checkConnection()
  }, [])

  const value = {
    wallet,
    connect,
    disconnect,
    isConnecting
  }

  return (
    <TonContext.Provider value={value}>
      {children}
    </TonContext.Provider>
  )
}