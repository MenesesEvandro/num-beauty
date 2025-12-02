export const locale = {
  code: 'mi-NZ',
  name: 'Māori (New Zealand)',
  masks: {},
  currencies: {
    NZD: { symbol: 'NZ$', position: 'before' },
  },
  units: [
    ['', ''],
    ['k', 'k'],
    ['m', 'm'],
    ['b', 'b'],
  ],
  speech: {
    // Basic Māori number words for accessibility helpers (short list)
    small: ['kore', 'tahi', 'rua', 'toru', 'wha', 'rima', 'ono', 'whitu', 'waru', 'iwa', 'tekau'],
    tens: ['', '', 'rua tekau', 'toru tekau'],
    units: [
      ['', ''],
      ['mano', 'mano'],
      ['miriona', 'miriona'],
    ],
    point: 'poutu',
    minus: 'negati',
    currency: {
      NZD: ['dora', 'dora'],
    },
    currencyJoiner: ' ',
  },
} as const;
