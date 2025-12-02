#!/usr/bin/env node
/* eslint-disable no-console */

/**
 * Check for performance regressions
 * Fails the CI build if significant regressions are detected
 * 
 * Usage:
 *   node scripts/check-regression.mjs base.json current.json
 */

import { readFileSync } from 'fs';

const [,, baseFile, currentFile] = process.argv;

if (!baseFile || !currentFile) {
  console.error('Usage: node check-regression.mjs <base.json> <current.json>');
  process.exit(1);
}

const base = JSON.parse(readFileSync(baseFile, 'utf8'));
const current = JSON.parse(readFileSync(currentFile, 'utf8'));

// Configuration
const REGRESSION_THRESHOLD = 15; // Fail if >15% slower
const MAX_REGRESSIONS_ALLOWED = 2; // Allow up to 2 minor regressions

// Create a map for easy lookup
const baseMap = new Map(base.results.map(r => [r.name, r]));

const regressions = [];

current.results.forEach(currentResult => {
  const baseResult = baseMap.get(currentResult.name);
  
  if (!baseResult) {
    return; // Skip new benchmarks
  }
  
  const change = ((currentResult.opsPerSec - baseResult.opsPerSec) / baseResult.opsPerSec) * 100;
  
  if (change < -REGRESSION_THRESHOLD) {
    regressions.push({
      name: currentResult.name,
      change: change.toFixed(1),
      baseOps: baseResult.opsPerSec,
      currentOps: currentResult.opsPerSec,
    });
  }
});

if (regressions.length > 0) {
  console.error('\n❌ PERFORMANCE REGRESSION DETECTED\n');
  console.error(`Found ${regressions.length} benchmark(s) with significant performance regression (>${REGRESSION_THRESHOLD}%):\n`);
  
  regressions.forEach(reg => {
    console.error(`  • ${reg.name}`);
    console.error(`    Base: ${reg.baseOps.toLocaleString()} ops/sec`);
    console.error(`    Current: ${reg.currentOps.toLocaleString()} ops/sec`);
    console.error(`    Change: ${reg.change}%\n`);
  });
  
  console.error('Performance regressions exceed the acceptable threshold.');
  console.error('Please optimize the code or adjust the threshold if this is expected.\n');
  
  process.exit(1);
}

// Check average performance
const avgChange = ((current.summary.avgOpsPerSec - base.summary.avgOpsPerSec) / base.summary.avgOpsPerSec) * 100;

if (avgChange < -10) {
  console.error('\n⚠️ WARNING: Average performance decreased by more than 10%\n');
  console.error(`Base average: ${base.summary.avgOpsPerSec.toLocaleString()} ops/sec`);
  console.error(`Current average: ${current.summary.avgOpsPerSec.toLocaleString()} ops/sec`);
  console.error(`Change: ${avgChange.toFixed(1)}%\n`);
  
  // Don't fail on average regression, just warn
}

console.log('✅ No significant performance regressions detected');
console.log(`\nBase average: ${base.summary.avgOpsPerSec.toLocaleString()} ops/sec`);
console.log(`Current average: ${current.summary.avgOpsPerSec.toLocaleString()} ops/sec`);
console.log(`Change: ${avgChange >= 0 ? '+' : ''}${avgChange.toFixed(1)}%`);

process.exit(0);
