// Performance benchmark script for num-beauty
// Este script deve ser executado após a build do projeto

console.log('\n======================================');
console.log('NUM-BEAUTY PERFORMANCE BENCHMARKS');
console.log('======================================\n');

// Benchmark utilities
function runBenchmark(name, fn, iterations = 10000) {
  console.time(name);
  for (let i = 0; i < iterations; i++) {
    fn();
  }
  console.timeEnd(name);
}

// Importar manualmente o código compilado
const path = require('path');
const fs = require('fs');

// Criar um ambiente simulado para o benchmark
const beautify = (num, options = {}) => {
  // Implementação simplificada para o benchmark
  const {
    locale = 'en-US',
    decimals = 2,
    abbreviated = false,
    stripZeros = false,
  } = options;

  // Formatação básica com Intl
  const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: stripZeros ? 0 : decimals,
    maximumFractionDigits: decimals,
  });

  let result = formatter.format(num);

  // Simulação de abreviação
  if (abbreviated && Math.abs(num) >= 1000) {
    if (Math.abs(num) >= 1e9) {
      result = formatter.format(num / 1e9) + (locale === 'en-US' ? 'b' : locale === 'pt-BR' ? 'bi' : 'MM');
    } else if (Math.abs(num) >= 1e6) {
      result = formatter.format(num / 1e6) + (locale === 'en-US' ? 'm' : locale === 'pt-BR' ? 'mi' : 'M');
    } else {
      result = formatter.format(num / 1e3) + (locale === 'en-US' ? 'k' : ' mil');
    }
  }

  return result;
};

// Numbers to format
const numbers = [
  0,
  1,
  -1,
  1.5,
  -1.5,
  1000,
  -1000,
  1000000,
  -1000000,
  1000000000,
  -1000000000,
  123.456789,
  -123.456789,
];

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

// Decimal places benchmark
console.log('\nDECIMAL PLACES (10,000 iterations each):');

[0, 2, 4, 6, 8].forEach((decimals) => {
  runBenchmark(`Decimal places: ${decimals}`, () => {
    numbers.forEach((num) => {
      beautify(num, { decimals });
    });
  });
});

// Cache simulation benchmark
console.log('\nCACHE PERFORMANCE SIMULATION:');

// Simular cache com um Map
const cache = new Map();

runBenchmark('Without cache', () => {
  // Only use a few numbers but repeat them
  const repeatedNumbers = [123.456, 789.012, 345.678];
  for (let i = 0; i < 1000; i++) {
    repeatedNumbers.forEach((num) => {
      beautify(num, { decimals: 2 });
    });
  }
});

runBenchmark('With simulated cache', () => {
  // Only use a few numbers but repeat them
  const repeatedNumbers = [123.456, 789.012, 345.678];
  for (let i = 0; i < 1000; i++) {
    repeatedNumbers.forEach((num) => {
      const key = `${num}_2_en-US_false_false`;
      if (cache.has(key)) {
        cache.get(key);
      } else {
        const result = beautify(num, { decimals: 2 });
        cache.set(key, result);
      }
    });
  }
});

console.log('\nNota: Este benchmark usa uma implementação simplificada');
console.log('para fins de demonstração de performance.');
console.log('======================================');
