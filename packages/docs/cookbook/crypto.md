# Crypto & High Precision

Cryptocurrencies often require high precision (e.g., 8 decimals for BTC, 18 for ETH) and involve large numbers (Wei, Satoshi) that exceed JavaScript's safe integer limit.

## Formatting Bitcoin

Bitcoin is typically displayed with up to 8 decimal places.

```typescript
import { beautify } from 'num-beauty';

const btcAmount = 1.23456789;

beautify(btcAmount, {
  decimals: 8,
  stripZeros: true // Optional: remove trailing zeros
});
// "1.23456789"
```

## Handling BigInt (Wei/Satoshi)

For Ethereum (Wei) or Bitcoin (Satoshi), values are often stored as integers. `num-beauty` supports `BigInt` natively.

```typescript
import { beautify } from 'num-beauty';

// 1 ETH = 10^18 Wei
const weiBalance = 1500000000000000000n; // 1.5 ETH

// To display as ETH, you might first convert to a string or number if precision allows,
// OR use BigInt directly if you want to format the integer value (e.g. total Wei).

// Formatting the raw BigInt (Wei)
beautify(weiBalance);
// "1,500,000,000,000,000,000"

// Abbreviating huge numbers
beautify(weiBalance, { abbreviated: true });
// "1.50 qi" (quintillion)
```

> [!TIP]
> For converting Wei to ETH (dividing by 10^18) for display, you typically perform the division before formatting. Since `num-beauty` focuses on formatting the *given* number, you should handle unit conversion in your app logic or use a library like `ethers.js` for the math, then pass the result to `beautify`.
