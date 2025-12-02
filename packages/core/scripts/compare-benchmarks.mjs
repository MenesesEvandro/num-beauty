#!/usr/bin/env node
/* eslint-disable no-console */

/**
 * Compare benchmark results between base and current branches
 * Generates a markdown report for PR comments
 * 
 * Usage:
 *   node scripts/compare-benchmarks.mjs base.json current.json
 */

import { readFileSync } from 'fs';

const [,, baseFile, currentFile] = process.argv;

if (!baseFile || !currentFile) {
  console.error('Usage: node compare-benchmarks.mjs <base.json> <current.json>');
  process.exit(1);
}

const base = JSON.parse(readFileSync(baseFile, 'utf8'));
const current = JSON.parse(readFileSync(currentFile, 'utf8'));

// Create a map for easy lookup
const baseMap = new Map(base.results.map(r => [r.name, r]));

console.log('## 📊 Performance Benchmark Results\n');
console.log('| Benchmark | Base (ops/sec) | Current (ops/sec) | Change | Status |');
console.log('|-----------|----------------|-------------------|--------|--------|');

let significantRegressions = 0;
let improvements = 0;

current.results.forEach(currentResult => {
  const baseResult = baseMap.get(currentResult.name);
  
  if (!baseResult) {
    console.log(`| ${currentResult.name} | N/A | ${currentResult.opsPerSec.toLocaleString()} | New | ℹ️ |`);
    return;
  }
  
  const change = ((currentResult.opsPerSec - baseResult.opsPerSec) / baseResult.opsPerSec) * 100;
  const changeFormatted = change >= 0 ? `+${change.toFixed(1)}%` : `${change.toFixed(1)}%`;
  
  let status;
  if (Math.abs(change) < 5) {
    status = '✅'; // No significant change
  } else if (change > 0) {
    status = '🚀'; // Improvement
    improvements++;
  } else if (change < -10) {
    status = '⚠️'; // Significant regression
    significantRegressions++;
  } else {
    status = '⚡'; // Minor regression
  }
  
  console.log(`| ${currentResult.name} | ${baseResult.opsPerSec.toLocaleString()} | ${currentResult.opsPerSec.toLocaleString()} | ${changeFormatted} | ${status} |`);
});

console.log('\n### Summary\n');
console.log(`- **Base average**: ${base.summary.avgOpsPerSec.toLocaleString()} ops/sec`);
console.log(`- **Current average**: ${current.summary.avgOpsPerSec.toLocaleString()} ops/sec`);

const avgChange = ((current.summary.avgOpsPerSec - base.summary.avgOpsPerSec) / base.summary.avgOpsPerSec) * 100;
console.log(`- **Average change**: ${avgChange >= 0 ? '+' : ''}${avgChange.toFixed(1)}%`);

if (improvements > 0) {
  console.log(`- 🚀 **${improvements}** benchmark(s) improved`);
}

if (significantRegressions > 0) {
  console.log(`- ⚠️ **${significantRegressions}** significant regression(s) detected (>10% slower)`);
}

console.log('\n#### Legend');
console.log('- ✅ No significant change (<5%)');
console.log('- 🚀 Performance improvement');
console.log('- ⚡ Minor regression (5-10%)');
console.log('- ⚠️ Significant regression (>10%)');

console.log('\n---');
console.log(`*Benchmark run at ${new Date(current.summary.timestamp).toLocaleString()}*`);
