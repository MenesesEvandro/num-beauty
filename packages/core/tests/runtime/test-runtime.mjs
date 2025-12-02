#!/usr/bin/env node
/* eslint-disable no-undef, no-console */
/**
 * Runtime compatibility test for num-beauty
 * Tests basic functionality across different JavaScript runtimes
 * 
 * Supported runtimes: Node.js, Deno, Bun, Browser/Edge
 */

import { beautify, formatCurrency, formatBytes, formatPercentage, round } from '../../dist/index.js';
import { loadLocale } from '../../dist/locales/loader.js';

// Color output helpers
const colors = {
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
  bold: (text) => `\x1b[1m${text}\x1b[0m`,
};

// Test results tracking
let passed = 0;
let failed = 0;
const failures = [];

// Assertion helper
function assert(condition, testName, expected, actual) {
  if (condition) {
    passed++;
    console.log(colors.green('✓'), testName);
  } else {
    failed++;
    const error = `Expected: ${expected}, Got: ${actual}`;
    failures.push({ testName, error });
    console.log(colors.red('✗'), testName);
    console.log(colors.red(`  ${error}`));
  }
}

// Detect runtime
function detectRuntime() {
  if (typeof Deno !== 'undefined') return 'Deno';
  if (typeof Bun !== 'undefined') return 'Bun';
  if (typeof process !== 'undefined' && process.versions && process.versions.node) return 'Node.js';
  if (typeof window !== 'undefined') return 'Browser';
  return 'Unknown';
}

console.log(colors.bold('\n=============================================='));
console.log(colors.bold('NUM-BEAUTY RUNTIME COMPATIBILITY TEST'));
console.log(colors.bold('==============================================\n'));

const runtime = detectRuntime();
console.log(colors.blue(`Runtime: ${runtime}`));
if (runtime === 'Node.js') {
  console.log(colors.blue(`Version: ${process.version}\n`));
} else if (runtime === 'Deno') {
  console.log(colors.blue(`Version: ${Deno.version.deno}\n`));
} else if (runtime === 'Bun') {
  console.log(colors.blue(`Version: ${Bun.version}\n`));
}

// Run tests
async function runTests() {
  console.log(colors.bold('Basic Formatting Tests:'));
  
  // Test 1: Basic formatting (en-US)
  const result1 = beautify(1234.567);
  assert(result1 === '1,234.57', 'beautify(1234.567)', '1,234.57', result1);
  
  // Test 2: Basic formatting (pt-BR)
  await loadLocale('pt-BR');
  const result2 = beautify(1234.567, { locale: 'pt-BR' });
  assert(result2 === '1.234,57', "beautify(1234.567, { locale: 'pt-BR' })", '1.234,57', result2);
  
  // Test 3: Abbreviated formatting
  const result3 = beautify(1234567, { abbreviated: true });
  assert(result3 === '1.23m', "beautify(1234567, { abbreviated: true })", '1.23m', result3);
  
  // Test 4: Strip zeros
  const result4 = beautify(1234.50, { stripZeros: true });
  assert(result4 === '1,234.5', "beautify(1234.50, { stripZeros: true })", '1,234.5', result4);
  
  // Test 5: Custom decimals
  const result5 = beautify(1234.56789, { decimals: 4 });
  assert(result5 === '1,234.5679', "beautify(1234.56789, { decimals: 4 })", '1,234.5679', result5);
  
  console.log(colors.bold('\nCurrency Tests:'));
  
  // Test 6: Currency USD
  const result6 = formatCurrency(1234.56, 'en-US', { currency: 'USD' });
  assert(result6 === '$1,234.56', "formatCurrency(1234.56, 'en-US', { currency: 'USD' })", '$1,234.56', result6);
  
  // Test 7: Currency BRL
  const result7 = formatCurrency(1234.56, 'pt-BR', { currency: 'BRL' });
  assert(result7 === 'R$ 1.234,56', "formatCurrency(1234.56, 'pt-BR', { currency: 'BRL' })", 'R$ 1.234,56', result7);
  
  console.log(colors.bold('\nBytes Tests:'));
  
  // Test 8: Bytes formatting (binary by default)
  const result8 = formatBytes(1024);
  assert(result8 === '1.00 KiB', 'formatBytes(1024)', '1.00 KiB', result8);
  
  // Test 9: Bytes MB (binary)
  const result9 = formatBytes(1048576);
  assert(result9 === '1.00 MiB', 'formatBytes(1048576)', '1.00 MiB', result9);
  
  console.log(colors.bold('\nPercentage Tests:'));
  
  // Test 10: Percentage
  const result10 = formatPercentage(0.1234);
  assert(result10 === '12.34%', 'formatPercentage(0.1234)', '12.34%', result10);
  
  // Test 11: Percentage with locale
  const result11 = formatPercentage(0.1234, { locale: 'pt-BR' });
  assert(result11 === '12,34 %', "formatPercentage(0.1234, { locale: 'pt-BR' })", '12,34 %', result11);
  
  console.log(colors.bold('\nRounding Tests:'));
  
  // Test 12: Round UP
  const result12 = round(1.234, 2, 'UP');
  assert(result12 === 1.24, "round(1.234, 2, 'UP')", 1.24, result12);
  
  // Test 13: Round DOWN
  const result13 = round(1.236, 2, 'DOWN');
  assert(result13 === 1.23, "round(1.236, 2, 'DOWN')", 1.23, result13);
  
  // Test 14: Round HALF_UP
  const result14 = round(1.235, 2, 'HALF_UP');
  assert(result14 === 1.24, "round(1.235, 2, 'HALF_UP')", 1.24, result14);
  
  console.log(colors.bold('\nEdge Cases:'));
  
  // Test 15: Zero
  const result15 = beautify(0);
  assert(result15 === '0.00', 'beautify(0)', '0.00', result15);
  
  // Test 16: Negative number
  const result16 = beautify(-1234.56);
  assert(result16 === '-1,234.56', 'beautify(-1234.56)', '-1,234.56', result16);
  
  // Test 17: Very large number
  const result17 = beautify(9999999999);
  assert(result17 === '9,999,999,999.00', 'beautify(9999999999)', '9,999,999,999.00', result17);
  
  // Test 18: Very small number
  const result18 = beautify(0.00123, { decimals: 5 });
  assert(result18 === '0.00123', "beautify(0.00123, { decimals: 5 })", '0.00123', result18);
  
  // Test 19: Abbreviated zero
  const result19 = beautify(0, { abbreviated: true });
  assert(result19 === '0.00', "beautify(0, { abbreviated: true })", '0.00', result19);
  
  // Test 20: Dynamic locale loading
  await loadLocale('es-ES');
  const result20 = beautify(1234.567, { locale: 'es-ES' });
  assert(result20 === '1.234,57', "beautify(1234.567, { locale: 'es-ES' })", '1.234,57', result20);
}

// Execute tests
try {
  await runTests();
  
  console.log(colors.bold('\n=============================================='));
  console.log(colors.bold('TEST RESULTS'));
  console.log(colors.bold('==============================================\n'));
  
  console.log(colors.green(`✓ Passed: ${passed}`));
  console.log(colors.red(`✗ Failed: ${failed}`));
  console.log(`Total: ${passed + failed}\n`);
  
  if (failed > 0) {
    console.log(colors.red(colors.bold('FAILURES:')));
    failures.forEach(({ testName, error }) => {
      console.log(colors.red(`\n${testName}`));
      console.log(colors.red(`  ${error}`));
    });
    console.log('');
    process.exit(1);
  } else {
    console.log(colors.green(colors.bold('ALL TESTS PASSED! ✓\n')));
    process.exit(0);
  }
} catch (error) {
  console.error(colors.red('\n✗ Runtime Error:'));
  console.error(colors.red(error.message));
  console.error(error.stack);
  process.exit(1);
}
