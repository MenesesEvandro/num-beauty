export const locale = {
  code: 'fr-FR',
  name: 'Français (France)',
  masks: {
    siren: '### ### ###', // Company identification
    siret: '### ### ### #####', // Establishment identification
    nir: '# ## ## ## ### ### ##', // Social security number
    'code-postal': '#####', // Postal code
    phone: '## ## ## ## ##', // Phone number
    iban: 'FR## #### #### #### #### #### ###', // IBAN (simplified)
    'tax-id': '### ### ###',
  },
  currencies: {
    EUR: { symbol: '€', position: 'after' }, // Euro with space: 1 234,56 €
    USD: { symbol: '$', position: 'before' }, // US Dollar
    GBP: { symbol: '£', position: 'before' }, // British Pound
    CHF: { symbol: 'CHF', position: 'after' }, // Swiss Franc
  },
  units: [
    ['', ''],
    ['k', 'k'], // Mille (thousands)
    ['M', 'M'], // Million
    ['Mrd', 'Mrd'], // Milliard (billion)
    ['Bio', 'Bio'], // Billion (trillion)
  ],
  speech: {
    small: [
      'zéro',
      'un',
      'deux',
      'trois',
      'quatre',
      'cinq',
      'six',
      'sept',
      'huit',
      'neuf',
      'dix',
      'onze',
      'douze',
      'treize',
      'quatorze',
      'quinze',
      'seize',
      'dix-sept',
      'dix-huit',
      'dix-neuf',
    ],
    tens: [
      '',
      '',
      'vingt',
      'trente',
      'quarante',
      'cinquante',
      'soixante',
      'soixante-dix',
      'quatre-vingts',
      'quatre-vingt-dix',
    ],
    units: [
      ['', ''],
      ['mille', 'mille'],
      ['million', 'millions'],
      ['milliard', 'milliards'],
      ['billion', 'billions'],
    ],
    point: 'virgule',
    minus: 'moins',
    currency: {
      EUR: ['euro', 'euros'],
      USD: ['dollar', 'dollars'],
      BRL: ['réal', 'réals'],
    },
    currencyJoiner: ' ',
  },
} as const;
