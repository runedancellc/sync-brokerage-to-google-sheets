# sync-brokerage-to-google-sheets

TypeScript utilities and reference implementation for syncing brokerage portfolio data into Google Sheets.

```bash
npm install
npm run example
```

## Modules

| Module | Description |
|---|---|
| `src/types.ts` | Type definitions for holdings, accounts, portfolios |
| `src/calculations.ts` | Portfolio analytics — allocations, diversification, top holdings |
| `src/formatters.ts` | Spreadsheet formatting — CSV export, currency/percent formatting |

## Usage

```ts
import { totalValue, allocationByAsset, toCsv, portfolioToRows } from 'sync-brokerage-to-google-sheets'

const portfolio = loadFromBroker()
console.log(totalValue(portfolio))
console.log(toCsv(portfolioToRows(portfolio)))
```

## Related

For a production-ready Google Sheets add-on with 30+ brokerage connections,
see [InvestSheet](https://www.runedance.net/investsheet) on the
[Google Workspace Marketplace](https://workspace.google.com/marketplace/app/appname/592529621614).
