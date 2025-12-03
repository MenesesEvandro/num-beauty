/**
 * Estonian locale configuration
 * Separators: space (thousands), , (decimal)
 * Currency: EUR (€)
 */
export const locale = {
  code: 'et-EE',
  name: 'Eesti (Estonian)',
  masks: {
    postal: '#####',
    phone: '+372 #### ####',
    'tax-id': '###########', // 11 digits
  },
  currencies: {
    EUR: { symbol: '€', position: 'after' as const },
    USD: { symbol: '$', position: 'before' as const },
  },
  units: [
    ['', ''],
    ['tuh.', 'K'], // tuhat (thousand)
    ['mln', 'M'], // miljon (million)
    ['mlrd', 'B'], // miljard (billion)
    ['trln', 'T'], // triljon (trillion)
  ] as const,
  speech: {
    numbers: {
      '0': 'null',
      '1': 'üks',
      '2': 'kaks',
      '3': 'kolm',
      '4': 'neli',
      '5': 'viis',
      '6': 'kuus',
      '7': 'seitse',
      '8': 'kaheksa',
      '9': 'üheksa',
      '10': 'kümme',
      '11': 'üksteist',
      '12': 'kaksteist',
      '13': 'kolmteist',
      '14': 'neliteist',
      '15': 'viisteist',
      '16': 'kuusteist',
      '17': 'seitseteist',
      '18': 'kaheksateist',
      '19': 'üheksateist',
      '20': 'kakskümmend',
      '30': 'kolmkümmend',
      '40': 'nelikümmend',
      '50': 'viiskümmend',
      '60': 'kuuskümmend',
      '70': 'seitsekümmend',
      '80': 'kaheksakümmend',
      '90': 'üheksakümmend',
      '100': 'sada',
      '1000': 'tuhat',
      '1000000': 'miljon',
      '1000000000': 'miljard',
      '1000000000000': 'triljon',
    },

    // Currency
    EUR: 'euro',
    USD: 'USA dollar',

    // Decimals
    point: 'punkt',
    comma: 'koma',
    decimal: 'koma',

    // Signs
    plus: 'pluss',
    minus: 'miinus',
    negative: 'negatiivne',
    positive: 'positiivne',

    // Ordinals
    ordinals: {
      '1': 'esimene',
      '2': 'teine',
      '3': 'kolmas',
      '4': 'neljas',
      '5': 'viies',
      '6': 'kuues',
      '7': 'seitsmes',
      '8': 'kaheksas',
      '9': 'üheksas',
      '10': 'kümnes',
    },
  },
};
