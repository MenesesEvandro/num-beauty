/**
 * Romanian locale configuration
 * Separators: . (thousands), , (decimal)
 * Currency: RON (lei)
 */
export const locale = {
  code: 'ro-RO',
  name: 'Română (Romanian)',
  masks: {
    postal: '######',
    phone: '+40-###-###-###',
    'tax-id': '#############', // CNP (13 digits)
  },
  currencies: {
    RON: { symbol: 'lei', position: 'after' as const },
    EUR: { symbol: '€', position: 'after' as const },
    USD: { symbol: '$', position: 'before' as const },
  },
  units: [
    ['', ''],
    ['mii', 'K'], // mii (thousand)
    ['mil.', 'M'], // milioane (million)
    ['mld.', 'B'], // miliarde (billion)
    ['tril.', 'T'], // trilioane (trillion)
  ] as const,
  speech: {
    // Numbers 0-10
    '0': 'zero',
    '1': 'unu',
    '2': 'doi',
    '3': 'trei',
    '4': 'patru',
    '5': 'cinci',
    '6': 'șase',
    '7': 'șapte',
    '8': 'opt',
    '9': 'nouă',
    '10': 'zece',

    // Tens
    '20': 'douăzeci',
    '30': 'treizeci',
    '40': 'patruzeci',
    '50': 'cincizeci',
    '60': 'șaizeci',
    '70': 'șaptezeci',
    '80': 'optzeci',
    '90': 'nouăzeci',

    // Hundreds
    '100': 'o sută',
    '1000': 'o mie',
    '1000000': 'un milion',
    '1000000000': 'un miliard',
    '1000000000000': 'un trilion',

    // Decimals
    point: 'virgulă',
    comma: 'virgulă',
    decimal: 'virgulă',

    // Signs
    plus: 'plus',
    minus: 'minus',
    negative: 'negativ',
    positive: 'pozitiv',

    // Currency
    RON: 'leu românesc',
    EUR: 'euro',
    USD: 'dolar american',
    GBP: 'liră sterlină',
    JPY: 'yen japonez',

    // Units
    thousand: 'mie',
    million: 'milion',
    billion: 'miliard',
    trillion: 'trilion',
  },
};
