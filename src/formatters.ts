import type { Portfolio, Allocation, Account, Holding } from './types.ts'

export interface SheetRow {
  [key: string]: string | number
}

export function holdingsToRows(account: Account): SheetRow[] {
  return account.holdings.map(h => ({
    Broker: account.broker,
    Account: account.name,
    Symbol: h.symbol,
    Name: h.name,
    Quantity: h.quantity,
    Price: h.price,
    Value: h.value,
    'Cost Basis': h.costBasis,
    'Gain/Loss': h.gainLoss,
    'Gain/Loss %': h.gainLossPercent,
    Type: h.type,
    Currency: h.currency,
  }))
}

export function portfolioToRows(portfolio: Portfolio): SheetRow[] {
  return portfolio.accounts.flatMap(holdingsToRows)
}

export function allocationToRows(allocation: Allocation[]): SheetRow[] {
  return allocation.map(a => ({
    Symbol: a.symbol,
    Name: a.name,
    Value: a.value,
    'Allocation %': a.percent,
    Type: a.type,
  }))
}

export function summaryRow(portfolio: Portfolio): SheetRow {
  return {
    'Total Value': portfolio.accounts.reduce((s, a) => s + a.totalValue, 0),
    'Total Cash': portfolio.accounts.reduce((s, a) => s + a.cash, 0),
    'Total Gain/Loss': portfolio.accounts.flatMap(a => a.holdings)
      .reduce((s, h) => s + h.gainLoss, 0),
    Accounts: portfolio.accounts.length,
    Holdings: portfolio.accounts.reduce((s, a) => s + a.holdings.length, 0),
    'Last Updated': portfolio.lastUpdated,
  }
}

export function csvEncode(val: string | number): string {
  const s = String(val)
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return `"${s.replace(/"/g, '""')}"`
  }
  return s
}

export function toCsv(rows: SheetRow[]): string {
  if (rows.length === 0) return ''
  const headers = Object.keys(rows[0])
  const lines = rows.map(row =>
    headers.map(h => csvEncode(row[h])).join(',')
  )
  return [headers.join(','), ...lines].join('\n')
}

export function currencyFormat(n: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(n)
}

export function percentFormat(n: number): string {
  return `${n >= 0 ? '+' : ''}${n.toFixed(2)}%`
}
