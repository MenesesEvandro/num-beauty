#!/usr/bin/env node
/* eslint-disable no-console */

/**
 * Benchmark runner with JSON output for CI/CD integration
 * Measures performance of core num-beauty operations
 * 
 * Usage:
 *   npm run benchmark:ci
 *   node scripts/benchmark.mjs --output results.json
 */

import { performance } from 'perf_hooks';
import { writeFileSync } from 'fs';
import { beautify } from '../dist/index.js';
import { formatCurrency } from '../dist/services/currency.service.js';
import { formatBytes } from '../dist/services/bytes.service.js';
import { formatPercentage } from '../dist/services/percentage.service.js';
import { round } from '../dist/services/rounding.service.js';
import { loadLocale } from '../dist/locales/loader.js';
import { hasLocale } from '../dist/locales/index.js';

// Load all required locales for benchmarks
console.log('Loading locales...');
await loadLocale('pt-BR');
await loadLocale('es-ES');
await loadLocale('de-DE');
await loadLocale('fr-FR');

// Verify all locales are loaded
console.log('Locales loaded:', {
  'pt-BR': hasLocale('pt-BR'),
  'es-ES': hasLocale('es-ES'),
  'de-DE': hasLocale('de-DE'),
  'fr-FR': hasLocale('fr-FR'),
  'en-US': hasLocale('en-US')
});
console.log('');

const ITERATIONS = 10000;

/**
 * Run a benchmark function and measure performance
 */
function benchmark(name, fn, iterations = ITERATIONS) {
  // Warm-up
  for (let i = 0; i < 100; i++) {
    fn();
  }

  // Measure
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    fn();
  }
  const end = performance.now();
  
  const totalMs = end - start;
  const opsPerSec = (iterations / totalMs) * 1000;
  const msPerOp = totalMs / iterations;

  return {
    name,
    iterations,
    totalMs: Number(totalMs.toFixed(2)),
    opsPerSec: Number(opsPerSec.toFixed(0)),
    msPerOp: Number(msPerOp.toFixed(6)),
  };
}

// Test data
const numbers = [
  0, 1, -1, 1.5, -1.5, 
  1000, -1000, 
  1000000, -1000000, 
  1000000000, -1000000000, 
  123.456789, -123.456789,
];

const results = [];

console.log('Running benchmarks...\n');

// Basic formatting
console.log('Basic formatting...');
results.push(benchmark('beautify (en-US)', () => {
  numbers.forEach(num => beautify(num, { locale: 'en-US' }));
}));

results.push(benchmark('beautify (pt-BR)', () => {
  numbers.forEach(num => beautify(num, { locale: 'pt-BR' }));
}));

results.push(benchmark('beautify (es-ES)', () => {
  numbers.forEach(num => beautify(num, { locale: 'es-ES' }));
}));

// Abbreviated formatting
console.log('Abbreviated formatting...');
results.push(benchmark('beautify abbreviated (en-US)', () => {
  numbers.forEach(num => beautify(num, { locale: 'en-US', abbreviated: true }));
}));

results.push(benchmark('beautify abbreviated (pt-BR)', () => {
  numbers.forEach(num => beautify(num, { locale: 'pt-BR', abbreviated: true }));
}));

// Currency formatting
console.log('Currency formatting...');
results.push(benchmark('formatCurrency (en-US, USD)', () => {
  numbers.forEach(num => formatCurrency(num, 'en-US', { currency: 'USD' }));
}));

results.push(benchmark('formatCurrency (pt-BR, BRL)', () => {
  numbers.forEach(num => formatCurrency(num, 'pt-BR', { currency: 'BRL' }));
}));

// Bytes formatting
console.log('Bytes formatting...');
results.push(benchmark('formatBytes', () => {
  [0, 1024, 1048576, 1073741824, 1099511627776].forEach(num => 
    formatBytes(num)
  );
}));

// Percentage formatting
console.log('Percentage formatting...');
results.push(benchmark('formatPercentage', () => {
  [0, 0.5, 1, 1.5, -0.25, 0.12345].forEach(num => 
    formatPercentage(num)
  );
}));

// Rounding
console.log('Rounding...');
const roundingModes = ['UP', 'DOWN', 'CEIL', 'FLOOR', 'HALF_UP', 'HALF_DOWN', 'HALF_EVEN'];
roundingModes.forEach(mode => {
  results.push(benchmark(`round (${mode})`, () => {
    numbers.forEach(num => round(num, 2, mode));
  }));
});

// Decimal precision
console.log('Decimal precision...');
[0, 2, 4, 6].forEach(decimals => {
  results.push(benchmark(`beautify (${decimals} decimals)`, () => {
    numbers.forEach(num => beautify(num, { decimals }));
  }));
});

// Cache performance (repeated values)
console.log('Cache performance...');
const cachedNumbers = [123.456, 123.456, 789.012, 789.012, 345.678, 345.678]; // Repeat same values
results.push(benchmark('beautify (cached values)', () => {
  cachedNumbers.forEach(num => beautify(num, { decimals: 2 }));
}));

console.log('\nBenchmark complete!\n');

// Calculate summary statistics
const summary = {
  totalBenchmarks: results.length,
  avgOpsPerSec: Number((results.reduce((sum, r) => sum + r.opsPerSec, 0) / results.length).toFixed(0)),
  minOpsPerSec: Math.min(...results.map(r => r.opsPerSec)),
  maxOpsPerSec: Math.max(...results.map(r => r.opsPerSec)),
  timestamp: new Date().toISOString(),
};

const output = {
  summary,
  results,
};

// Output results
if (process.argv.includes('--json')) {
  console.log(JSON.stringify(output, null, 2));
} else if (process.argv.includes('--output')) {
  const outputIndex = process.argv.indexOf('--output');
  const filename = process.argv[outputIndex + 1] || 'benchmark-results.json';
  writeFileSync(filename, JSON.stringify(output, null, 2));
  console.log(`Results written to ${filename}`);
} else {
  // Human-readable output
  console.log('SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total benchmarks: ${summary.totalBenchmarks}`);
  console.log(`Average ops/sec: ${summary.avgOpsPerSec.toLocaleString()}`);
  console.log(`Min ops/sec: ${summary.minOpsPerSec.toLocaleString()}`);
  console.log(`Max ops/sec: ${summary.maxOpsPerSec.toLocaleString()}`);
  console.log('');
  
  console.log('DETAILED RESULTS');
  console.log('='.repeat(60));
  results.forEach(result => {
    console.log(`${result.name.padEnd(40)} ${result.opsPerSec.toLocaleString().padStart(10)} ops/sec`);
  });
}
