/**
 * Irish (Ireland) locale configuration
 * Separators: , (thousands), . (decimal)
 * Currency: EUR (€)
 */
export const locale = {
  code: 'ga-IE',
  name: 'Gaeilge (Irish)',
  masks: {
    postal: 'A## ####',
    phone: '+353 ## ### ####',
    'tax-id': '#########', // 9 chars (simplified)
  },
  currencies: {
    EUR: { symbol: '€', position: 'before' as const },
    GBP: { symbol: '£', position: 'before' as const },
    USD: { symbol: '$', position: 'before' as const },
  },
  units: [
    ['', ''],
    ['k', 'K'], // thousand (abbr used)
    ['M', 'M'], // million
    ['B', 'B'], // billion
    ['T', 'T'], // trillion
  ] as const,
  speech: {
    numbers: {
      '0': 'nialas',
      '1': 'aon',
      '2': 'dó',
      '3': 'trí',
      '4': 'ceathair',
      '5': 'cúig',
      '6': 'sé',
      '7': 'seacht',
      '8': 'ocht',
      '9': 'naoi',
      '10': 'deich',
      '11': 'aon déag',
      '12': 'dó dhéag',
      '13': 'trí déag',
      '14': 'ceathair déag',
      '15': 'cúig déag',
      '16': 'sé déag',
      '17': 'seacht déag',
      '18': 'ocht déag',
      '19': 'naoi déag',
      '20': 'fiche',
      '30': 'tríocha',
      '40': 'daichead',
      '50': 'caoga',
      '60': 'seasca',
      '70': 'seachtó',
      '80': 'ochtó',
      '90': 'nócha',
      '100': 'céad',
      '1000': 'míle',
      '1000000': 'millún',
      '1000000000': 'billiún',
      '1000000000000': 'trilliún',
    },

    // Currency
    EUR: 'euro',
    GBP: 'punt steirling',
    USD: 'dollar SAM',

    // Decimals
    point: 'pointe',
    comma: 'camóg',
    decimal: 'pointe',

    // Signs
    plus: 'móide',
    minus: 'lúide',
    negative: 'diúltach',
    positive: 'deimhneach',

    // Ordinals
    ordinals: {
      '1': 'an chéad',
      '2': 'an dara',
      '3': 'an tríú',
      '4': 'an ceathrú',
      '5': 'an cúigiú',
      '6': 'an séú',
      '7': 'an seachtú',
      '8': 'an t‑ochtú',
      '9': 'an naoú',
      '10': 'an deichiú',
    },
  },
};
