/* eslint-env jest */
import { beautify } from '../src/index.js';

// Benchmark utilities
const runBenchmark = (name: string, fn: () => void, iterations = 10000): void => {
  console.time(name);
  for (let i = 0; i < iterations; i++) {
    fn();
  }
  console.timeEnd(name);
};

// Numbers to format
const numbers = [
  0, 1, -1, 1.5, -1.5, 1000, -1000, 1000000, -1000000, 1000000000, -1000000000, 123.456789,
  -123.456789,
];

console.log('\n======================================');
console.log('NUM-BEAUTY PERFORMANCE BENCHMARKS');
console.log('======================================\n');

// Basic formatting benchmark
console.log('BASIC FORMATTING (10,000 iterations each):');

runBenchmark('Basic formatting (en-US)', () => {
  numbers.forEach((num) => {
    beautify(num, { locale: 'en-US' });
  });
});

runBenchmark('Basic formatting (pt-BR)', () => {
  numbers.forEach((num) => {
    beautify(num, { locale: 'pt-BR' });
  });
});

runBenchmark('Basic formatting (es-ES)', () => {
  numbers.forEach((num) => {
    beautify(num, { locale: 'es-ES' });
  });
});

// Abbreviated formatting benchmark
console.log('\nABBREVIATED FORMATTING (10,000 iterations each):');

runBenchmark('Abbreviated formatting (en-US)', () => {
  numbers.forEach((num) => {
    beautify(num, { locale: 'en-US', abbreviated: true });
  });
});

runBenchmark('Abbreviated formatting (pt-BR)', () => {
  numbers.forEach((num) => {
    beautify(num, { locale: 'pt-BR', abbreviated: true });
  });
});

runBenchmark('Abbreviated formatting (es-ES)', () => {
  numbers.forEach((num) => {
    beautify(num, { locale: 'es-ES', abbreviated: true });
  });
});

// Rounding benchmark
console.log('\nROUNDING MODES (10,000 iterations each):');

const roundingModes = ['UP', 'DOWN', 'CEIL', 'FLOOR', 'HALF_UP', 'HALF_DOWN', 'HALF_EVEN'];
roundingModes.forEach((mode) => {
  runBenchmark(`Rounding mode: ${mode}`, () => {
    numbers.forEach((num) => {
      beautify(num, { roundingMode: mode as any, decimals: 2 });
    });
  });
});

// Benchmarking with different decimal places
console.log('\nDECIMAL PLACES (10,000 iterations each):');

[0, 2, 4, 6, 8].forEach((decimals) => {
  runBenchmark(`Decimal places: ${decimals}`, () => {
    numbers.forEach((num) => {
      beautify(num, { decimals });
    });
  });
});

// Cache performance
console.log('\nCACHE PERFORMANCE:');

runBenchmark('With cache (repeated values)', () => {
  // Only use a few numbers but repeat them
  const repeatedNumbers = [123.456, 789.012, 345.678];
  for (let i = 0; i < 5000; i++) {
    repeatedNumbers.forEach((num) => {
      beautify(num, { decimals: 2 });
    });
  }
});

// Custom script to run the benchmark
console.log('\nRun with: node --loader ts-node/esm tests/performance.bench.ts');
console.log('======================================\n');
