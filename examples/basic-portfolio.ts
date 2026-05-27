import {
  totalValue,
  totalCash,
  totalGainLoss,
  allocationByAsset,
  allocationByType,
  allocationByBroker,
  topHoldings,
  portfolioToRows,
  toCsv,
  currencyFormat,
  percentFormat,
} from '../src/index.ts'

const samplePortfolio = {
  currency: 'USD',
  lastUpdated: new Date().toISOString(),
  accounts: [
    {
      id: 'broker-1',
      name: 'Main Account',
      broker: 'Fidelity',
      type: 'brokerage',
      cash: 12500.00,
      totalValue: 87500.00,
      holdings: [
        { symbol: 'AAPL', name: 'Apple Inc.', quantity: 100, price: 220, value: 22000, costBasis: 15000, gainLoss: 7000, gainLossPercent: 46.67, currency: 'USD', type: 'stock' },
        { symbol: 'IVV', name: 'iShares S&P 500 ETF', quantity: 50, price: 550, value: 27500, costBasis: 24000, gainLoss: 3500, gainLossPercent: 14.58, currency: 'USD', type: 'etf' },
        { symbol: 'MSFT', name: 'Microsoft Corp.', quantity: 40, price: 420, value: 16800, costBasis: 12000, gainLoss: 4800, gainLossPercent: 40.00, currency: 'USD', type: 'stock' },
        { symbol: 'BND', name: 'Vanguard Total Bond Market ETF', quantity: 80, price: 72, value: 5760, costBasis: 6000, gainLoss: -240, gainLossPercent: -4.00, currency: 'USD', type: 'etf' },
        { symbol: 'VXUS', name: 'Vanguard Total International Stock ETF', quantity: 60, price: 62, value: 3720, costBasis: 4000, gainLoss: -280, gainLossPercent: -7.00, currency: 'USD', type: 'etf' },
      ],
    },
    {
      id: 'broker-2',
      name: 'Retirement',
      broker: 'Schwab',
      type: 'ira',
      cash: 3000.00,
      totalValue: 62000.00,
      holdings: [
        { symbol: 'SWTSX', name: 'Schwab Total Stock Market Index Fund', quantity: 300, price: 85, value: 25500, costBasis: 22000, gainLoss: 3500, gainLossPercent: 15.91, currency: 'USD', type: 'mutual_fund' },
        { symbol: 'SWISX', name: 'Schwab International Index Fund', quantity: 200, price: 32, value: 6400, costBasis: 6000, gainLoss: 400, gainLossPercent: 6.67, currency: 'USD', type: 'mutual_fund' },
        { symbol: 'SWAGX', name: 'Schwab US Aggregate Bond Index Fund', quantity: 250, price: 10, value: 2500, costBasis: 2600, gainLoss: -100, gainLossPercent: -3.85, currency: 'USD', type: 'mutual_fund' },
        { symbol: 'AAPL', name: 'Apple Inc.', quantity: 30, price: 220, value: 6600, costBasis: 4800, gainLoss: 1800, gainLossPercent: 37.50, currency: 'USD', type: 'stock' },
        { symbol: 'GOOGL', name: 'Alphabet Inc.', quantity: 15, price: 180, value: 2700, costBasis: 2400, gainLoss: 300, gainLossPercent: 12.50, currency: 'USD', type: 'stock' },
        { symbol: 'AMZN', name: 'Amazon.com Inc.', quantity: 10, price: 200, value: 2000, costBasis: 1800, gainLoss: 200, gainLossPercent: 11.11, currency: 'USD', type: 'stock' },
      ],
    },
    {
      id: 'broker-3',
      name: 'Crypto',
      broker: 'Coinbase',
      type: 'crypto',
      cash: 500.00,
      totalValue: 15500.00,
      holdings: [
        { symbol: 'BTC', name: 'Bitcoin', quantity: 0.25, price: 42000, value: 10500, costBasis: 8750, gainLoss: 1750, gainLossPercent: 20.00, currency: 'USD', type: 'crypto' },
        { symbol: 'ETH', name: 'Ethereum', quantity: 2.5, price: 2000, value: 5000, costBasis: 5500, gainLoss: -500, gainLossPercent: -9.09, currency: 'USD', type: 'crypto' },
      ],
    },
  ],
}

console.log('=== Portfolio Summary ===')
console.log(`Total Value:    ${currencyFormat(totalValue(samplePortfolio))}`)
console.log(`Total Cash:     ${currencyFormat(totalCash(samplePortfolio))}`)
console.log(`Total Gain/Loss: ${currencyFormat(totalGainLoss(samplePortfolio))}`)
console.log()

console.log('=== Allocation by Asset ===')
for (const a of allocationByAsset(samplePortfolio).slice(0, 8)) {
  console.log(`  ${a.symbol.padEnd(6)} ${currencyFormat(a.value).padStart(12)}  ${percentFormat(a.percent).padStart(8)}  ${a.name}`)
}
console.log()

console.log('=== Allocation by Type ===')
for (const a of allocationByType(samplePortfolio)) {
  console.log(`  ${a.name.padEnd(16)} ${currencyFormat(a.value).padStart(12)}  ${percentFormat(a.percent).padStart(8)}`)
}
console.log()

console.log('=== Allocation by Broker ===')
for (const a of allocationByBroker(samplePortfolio)) {
  console.log(`  ${a.name.padEnd(16)} ${currencyFormat(a.value).padStart(12)}  ${percentFormat(a.percent).padStart(8)}`)
}
console.log()

console.log('=== Top Holdings ===')
for (const h of topHoldings(samplePortfolio, 5)) {
  console.log(`  ${h.symbol.padEnd(6)} ${currencyFormat(h.value).padStart(12)}  ${percentFormat(h.percent).padStart(8)}  ${h.name}`)
}
console.log()

console.log('=== CSV Output (first 5 rows) ===')
const csv = toCsv(portfolioToRows(samplePortfolio))
for (const line of csv.split('\n').slice(0, 6)) {
  console.log(`  ${line}`)
}
