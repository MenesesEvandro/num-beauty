/**
 * Catalan locale configuration
 * Separators: . (thousands), , (decimal)
 * Currency: EUR (€)
 */
export const locale = {
  code: 'ca-ES',
  name: 'Català (Catalan)',
  masks: {
    postal: '#####',
    phone: '+34 ### ## ## ##',
    'tax-id': '########-#', // NIF/NIE - 9 characters
  },
  currencies: {
    EUR: { symbol: '€', position: 'after' as const },
    USD: { symbol: '$', position: 'before' as const },
    GBP: { symbol: '£', position: 'before' as const },
  },
  units: [
    ['', ''],
    ['milers', 'K'], // thousand (milers)
    ['M', 'M'], // million (milions)
    ['mil M', 'B'], // billion (mil milions)
    ['B', 'T'], // trillion (bilions)
  ] as const,
  speech: {
    numbers: {
      '0': 'zero',
      '1': 'un',
      '2': 'dos',
      '3': 'tres',
      '4': 'quatre',
      '5': 'cinc',
      '6': 'sis',
      '7': 'set',
      '8': 'vuit',
      '9': 'nou',
      '10': 'deu',
      '11': 'onze',
      '12': 'dotze',
      '13': 'tretze',
      '14': 'catorze',
      '15': 'quinze',
      '16': 'setze',
      '17': 'disset',
      '18': 'divuit',
      '19': 'dinou',
      '20': 'vint',
      '30': 'trenta',
      '40': 'quaranta',
      '50': 'cinquanta',
      '60': 'seixanta',
      '70': 'setanta',
      '80': 'vuitanta',
      '90': 'noranta',
      '100': 'cent',
      '1000': 'mil',
      '1000000': 'un milió',
      '1000000000': 'mil milions',
      '1000000000000': 'un bilió',
    },

    // Currency
    EUR: 'euro',
    USD: 'dòlar americà',
    GBP: 'lliura esterlina',

    // Decimals
    point: 'punt',
    comma: 'coma',
    decimal: 'coma',

    // Signs
    plus: 'més',
    minus: 'menys',
    negative: 'negatiu',
    positive: 'positiu',

    // Ordinals
    ordinals: {
      '1': 'primer',
      '2': 'segon',
      '3': 'tercer',
      '4': 'quart',
      '5': 'cinquè',
      '6': 'sisè',
      '7': 'setè',
      '8': 'vuitè',
      '9': 'novè',
      '10': 'desè',
    },
  },
};
