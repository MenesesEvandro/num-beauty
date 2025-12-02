# Getting Started

Num-Beauty is a comprehensive library for formatting numbers in JavaScript applications. It provides a simple API for common tasks like currency formatting, abbreviation, and masking, while also offering advanced features like BigInt support and chart helpers.

## Installation

```bash
pnpm add num-beauty
# or
npm install num-beauty
# or
yarn add num-beauty
```

## Basic Usage

```typescript
import { beautify } from 'num-beauty';

// Basic formatting
beautify(1234.56); // "1,234.56" (en-US default)

// Currency
beautify(1234.56, { currency: 'USD' }); // "$1,234.56"

// Abbreviation
beautify(1000000, { abbreviated: true }); // "1M"
```
