/**
 * Czech locale configuration
 * Separators: space (thousands), , (decimal)
 * Currency: CZK (Kč)
 */
export const locale = {
  code: 'cs-CZ',
  name: 'Čeština (Czech)',
  masks: {
    postal: '### ##',
    phone: '+420-###-###-###',
    'tax-id': '##########', // Rodné číslo (10 digits)
  },
  currencies: {
    CZK: { symbol: 'Kč', position: 'after' as const },
    EUR: { symbol: '€', position: 'after' as const },
    USD: { symbol: '$', position: 'before' as const },
  },
  units: [
    ['', ''],
    ['tis.', 'K'], // tisíc (thousand)
    ['mil.', 'M'], // milion (million)
    ['mld.', 'B'], // miliarda (billion)
    ['bil.', 'T'], // bilion (trillion)
  ] as const,
  speech: {
    // Numbers 0-10
    '0': 'nula',
    '1': 'jeden',
    '2': 'dva',
    '3': 'tři',
    '4': 'čtyři',
    '5': 'pět',
    '6': 'šest',
    '7': 'sedm',
    '8': 'osm',
    '9': 'devět',
    '10': 'deset',

    // Tens
    '20': 'dvacet',
    '30': 'třicet',
    '40': 'čtyřicet',
    '50': 'padesát',
    '60': 'šedesát',
    '70': 'sedmdesát',
    '80': 'osmdesát',
    '90': 'devadesát',

    // Hundreds
    '100': 'sto',
    '1000': 'tisíc',
    '1000000': 'milion',
    '1000000000': 'miliarda',
    '1000000000000': 'bilion',

    // Decimals
    point: 'čárka',
    comma: 'čárka',
    decimal: 'čárka',

    // Signs
    plus: 'plus',
    minus: 'mínus',
    negative: 'negativní',
    positive: 'pozitivní',

    // Currency
    CZK: 'česká koruna',
    EUR: 'euro',
    USD: 'americký dolar',
    GBP: 'britská libra',
    JPY: 'japonský jen',

    // Units
    thousand: 'tisíc',
    million: 'milion',
    billion: 'miliarda',
    trillion: 'bilion',
  },
};
