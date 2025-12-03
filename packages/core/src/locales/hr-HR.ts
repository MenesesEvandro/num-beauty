/**
 * Croatian locale configuration
 * Separators: . (thousands), , (decimal)
 * Currency: EUR (€)
 */
export const locale = {
  code: 'hr-HR',
  name: 'Hrvatski (Croatian)',
  masks: {
    postal: '#####',
    phone: '+385-##-###-####',
    'tax-id': '###########', // OIB (11 digits)
  },
  currencies: {
    EUR: { symbol: '€', position: 'after' as const },
    USD: { symbol: '$', position: 'before' as const },
    GBP: { symbol: '£', position: 'before' as const },
  },
  units: [
    ['', ''],
    ['tis.', 'K'], // tisuća (thousand)
    ['mil.', 'M'], // milijun (million)
    ['mlrd.', 'B'], // milijarda (billion)
    ['bil.', 'T'], // bilijun (trillion)
  ] as const,
  speech: {
    // Numbers 0-10
    '0': 'nula',
    '1': 'jedan',
    '2': 'dva',
    '3': 'tri',
    '4': 'četiri',
    '5': 'pet',
    '6': 'šest',
    '7': 'sedam',
    '8': 'osam',
    '9': 'devet',
    '10': 'deset',

    // Tens
    '20': 'dvadeset',
    '30': 'trideset',
    '40': 'četrdeset',
    '50': 'pedeset',
    '60': 'šezdeset',
    '70': 'sedamdeset',
    '80': 'osamdeset',
    '90': 'devedeset',

    // Hundreds
    '100': 'sto',
    '1000': 'tisuća',
    '1000000': 'milijun',
    '1000000000': 'milijarda',
    '1000000000000': 'bilijun',

    // Decimals
    point: 'zarez',
    comma: 'zarez',
    decimal: 'zarez',

    // Signs
    plus: 'plus',
    minus: 'minus',
    negative: 'negativan',
    positive: 'pozitivan',

    // Currency
    EUR: 'euro',
    USD: 'američki dolar',
    GBP: 'britanska funta',
    JPY: 'japanski jen',

    // Units
    thousand: 'tisuća',
    million: 'milijun',
    billion: 'milijarda',
    trillion: 'bilijun',
  },
};
