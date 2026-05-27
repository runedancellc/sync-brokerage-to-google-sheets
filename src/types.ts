export interface Holding {
  symbol: string
  name: string
  quantity: number
  price: number
  value: number
  costBasis: number
  gainLoss: number
  gainLossPercent: number
  currency: string
  type: 'stock' | 'etf' | 'mutual_fund' | 'option' | 'crypto'
}

export interface Account {
  id: string
  name: string
  broker: string
  type: string
  holdings: Holding[]
  cash: number
  totalValue: number
}

export interface Portfolio {
  accounts: Account[]
  lastUpdated: string
  currency: string
}

export interface Allocation {
  symbol: string
  name: string
  value: number
  percent: number
  type: string
}
