import type { Portfolio, Allocation, Account, Holding } from './types.ts'

export function totalValue(portfolio: Portfolio): number {
  return portfolio.accounts.reduce((sum, a) => sum + a.totalValue, 0)
}

export function totalCash(portfolio: Portfolio): number {
  return portfolio.accounts.reduce((sum, a) => sum + a.cash, 0)
}

export function totalGainLoss(portfolio: Portfolio): number {
  return portfolio.accounts.flatMap(a => a.holdings)
    .reduce((sum, h) => sum + h.gainLoss, 0)
}

export function allocationByAsset(portfolio: Portfolio): Allocation[] {
  const all = portfolio.accounts.flatMap(a => a.holdings)
  const total = all.reduce((s, h) => s + h.value, 0)

  const grouped = new Map<string, { name: string; value: number; type: string }>()
  for (const h of all) {
    const g = grouped.get(h.symbol)
    if (g) {
      g.value += h.value
    } else {
      grouped.set(h.symbol, { name: h.name, value: h.value, type: h.type })
    }
  }

  return Array.from(grouped.entries())
    .map(([symbol, g]) => ({
      symbol,
      name: g.name,
      value: g.value,
      percent: total > 0 ? (g.value / total) * 100 : 0,
      type: g.type,
    }))
    .sort((a, b) => b.value - a.value)
}

export function allocationByType(portfolio: Portfolio): Allocation[] {
  const all = portfolio.accounts.flatMap(a => a.holdings)
  const total = all.reduce((s, h) => s + h.value, 0)

  const grouped = new Map<string, number>()
  for (const h of all) {
    grouped.set(h.type, (grouped.get(h.type) ?? 0) + h.value)
  }

  return Array.from(grouped.entries())
    .map(([type, value]) => ({
      symbol: type,
      name: type.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      value,
      percent: total > 0 ? (value / total) * 100 : 0,
      type,
    }))
    .sort((a, b) => b.value - a.value)
}

export function allocationByBroker(portfolio: Portfolio): Allocation[] {
  const total = portfolio.accounts.reduce((s, a) => s + a.totalValue, 0)

  return portfolio.accounts.map(a => ({
    symbol: a.broker,
    name: a.name,
    value: a.totalValue,
    percent: total > 0 ? (a.totalValue / total) * 100 : 0,
    type: 'brokerage',
  }))
}

export function topHoldings(portfolio: Portfolio, n = 10): Allocation[] {
  const all = portfolio.accounts.flatMap(a => a.holdings)
  const total = all.reduce((s, h) => s + h.value, 0)

  const grouped = new Map<string, { name: string; value: number }>()
  for (const h of all) {
    const g = grouped.get(h.symbol)
    if (g) {
      g.value += h.value
    } else {
      grouped.set(h.symbol, { name: h.name, value: h.value })
    }
  }

  return Array.from(grouped.entries())
    .map(([symbol, g]) => ({
      symbol,
      name: g.name,
      value: g.value,
      percent: total > 0 ? (g.value / total) * 100 : 0,
      type: 'holding',
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, n)
}

export function diversificationScore(portfolio: Portfolio): number {
  const all = portfolio.accounts.flatMap(a => a.holdings)
  const total = all.reduce((s, h) => s + h.value, 0)
  if (total === 0) return 0

  const bySymbol = new Map<string, number>()
  for (const h of all) {
    bySymbol.set(h.symbol, (bySymbol.get(h.symbol) ?? 0) + h.value)
  }

  const weights = Array.from(bySymbol.values()).map(v => v / total)
  const hhi = weights.reduce((sum, w) => sum + w * w, 0)
  return hhi
}
