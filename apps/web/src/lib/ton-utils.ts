import { Address, toNano } from '@ton/ton'

// TON initialization function
export function initTON(config?: {
  network?: 'mainnet' | 'testnet'
  apiKey?: string
}) {
  const network = config?.network || 'mainnet'
  const apiKey = config?.apiKey || process.env.TON_API_KEY
  
  return {
    network,
    apiKey,
    isMainnet: network === 'mainnet',
    isTestnet: network === 'testnet',
  }
}

// Utility funkcije za TON blockchain
export class TonUtils {
  static parseAddress(address: string): Address {
    try {
      return Address.parse(address)
    } catch (error) {
      throw new Error(`Invalid TON address: ${address}`)
    }
  }

  static formatAddress(address: Address | string): string {
    if (typeof address === 'string') {
      return address
    }
    return address.toString()
  }

  static toNanoTon(amount: string | number): bigint {
    return toNano(amount)
  }

  static fromNanoTon(amount: bigint | string): string {
    const nanoAmount = typeof amount === 'string' ? BigInt(amount) : amount
    return (Number(nanoAmount) / 1e9).toFixed(9)
  }

  static validateAddress(address: string): boolean {
    try {
      Address.parse(address)
      return true
    } catch {
      return false
    }
  }

  static createTransferMessage(to: string, amount: string | number) {
    return {
      validUntil: Math.floor(Date.now() / 1000) + 300, // 5 minutes
      messages: [
        {
          address: this.parseAddress(to), // Parsiramo string u Address
          amount: this.toNanoTon(amount),
        }
      ]
    }
  }

  static createMultiTransferMessage(transfers: Array<{to: string, amount: string | number}>) {
    return {
      validUntil: Math.floor(Date.now() / 1000) + 300,
      messages: transfers.map(transfer => ({
        address: this.parseAddress(transfer.to),
        amount: this.toNanoTon(transfer.amount),
      }))
    }
  }

  static isMainnetAddress(address: string): boolean {
    try {
      const addr = Address.parse(address)
      return addr.workChain === 0
    } catch {
      return false
    }
  }

  static isTestnetAddress(address: string): boolean {
    try {
      const addr = Address.parse(address)
      return addr.workChain === -1
    } catch {
      return false
    }
  }
}

// Export static methods kao standalone funkcije za lakše korišćenje
export const parseAddress = TonUtils.parseAddress.bind(TonUtils)
export const formatAddress = TonUtils.formatAddress.bind(TonUtils)
export const toNanoTon = TonUtils.toNanoTon.bind(TonUtils)
export const fromNanoTon = TonUtils.fromNanoTon.bind(TonUtils)
export const validateAddress = TonUtils.validateAddress.bind(TonUtils)
export const createTransferMessage = TonUtils.createTransferMessage.bind(TonUtils)
export const createMultiTransferMessage = TonUtils.createMultiTransferMessage.bind(TonUtils)

// Konstante za česte adrese
export const TON_ADDRESSES = {
  ZERO: 'EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c',
  BURN: 'EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c'
} as const

// Tipovi
export interface TransferRequest {
  to: string
  amount: string | number
  payload?: string
  stateInit?: string
}

export interface MultiTransferRequest {
  transfers: TransferRequest[]
  validUntil?: number
}

export default TonUtils