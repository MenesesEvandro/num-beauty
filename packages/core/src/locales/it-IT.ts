/**
 * Italian locale configuration
 * Separators: . (thousands), , (decimal)
 * Currency: EUR (€)
 */
export const locale = {
  code: 'it-IT',
  name: 'Italiano (Italian)',
  masks: {
    postal: '#####',
    phone: '+39-###-###-####',
    'tax-id': '****************', // Codice Fiscale (16 alphanumeric)
  },
  currencies: {
    EUR: { symbol: '€', position: 'after' as const },
    USD: { symbol: '$', position: 'before' as const },
    GBP: { symbol: '£', position: 'before' as const },
  },
  units: [
    ['', ''],
    ['mila', 'K'], // thousand
    ['mln', 'M'], // million
    ['mld', 'B'], // billion
    ['bln', 'T'], // trillion
  ] as const,
  speech: {
    // Numbers 0-10
    '0': 'zero',
    '1': 'uno',
    '2': 'due',
    '3': 'tre',
    '4': 'quattro',
    '5': 'cinque',
    '6': 'sei',
    '7': 'sette',
    '8': 'otto',
    '9': 'nove',
    '10': 'dieci',

    // Tens
    '20': 'venti',
    '30': 'trenta',
    '40': 'quaranta',
    '50': 'cinquanta',
    '60': 'sessanta',
    '70': 'settanta',
    '80': 'ottanta',
    '90': 'novanta',

    // Hundreds
    '100': 'cento',
    '1000': 'mille',
    '1000000': 'un milione',
    '1000000000': 'un miliardo',
    '1000000000000': 'un trilione',

    // Decimals
    point: 'virgola',
    comma: 'virgola',
    decimal: 'virgola',

    // Signs
    plus: 'più',
    minus: 'meno',
    negative: 'negativo',
    positive: 'positivo',

    // Currency
    EUR: 'euro',
    USD: 'dollaro statunitense',
    GBP: 'sterlina britannica',
    JPY: 'yen giapponese',
    CHF: 'franco svizzero',

    // Units
    thousand: 'mila',
    million: 'milione',
    billion: 'miliardo',
    trillion: 'trilione',
  },
};
