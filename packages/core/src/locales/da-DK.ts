/**
 * Danish locale configuration
 * Separators: . (thousands), , (decimal)
 * Currency: DKK (kr)
 */
export const locale = {
  code: 'da-DK',
  name: 'Dansk (Danish)',
  masks: {
    postal: '####',
    phone: '+45-##-##-##-##',
    'tax-id': '##########', // CPR-nummer (10 digits)
  },
  currencies: {
    DKK: { symbol: 'kr', position: 'after' as const },
    EUR: { symbol: '€', position: 'after' as const },
    USD: { symbol: '$', position: 'before' as const },
  },
  units: [
    ['', ''],
    ['tus.', 'K'], // tusind (thousand)
    ['mio.', 'M'], // million
    ['mia.', 'B'], // milliard (billion)
    ['bio.', 'T'], // billion (trillion)
  ] as const,
  speech: {
    // Numbers 0-10
    '0': 'nul',
    '1': 'en',
    '2': 'to',
    '3': 'tre',
    '4': 'fire',
    '5': 'fem',
    '6': 'seks',
    '7': 'syv',
    '8': 'otte',
    '9': 'ni',
    '10': 'ti',

    // Tens
    '20': 'tyve',
    '30': 'tredive',
    '40': 'fyrre',
    '50': 'halvtreds',
    '60': 'tres',
    '70': 'halvfjerds',
    '80': 'firs',
    '90': 'halvfems',

    // Hundreds
    '100': 'hundrede',
    '1000': 'tusind',
    '1000000': 'en million',
    '1000000000': 'en milliard',
    '1000000000000': 'en billion',

    // Decimals
    point: 'komma',
    comma: 'komma',
    decimal: 'komma',

    // Signs
    plus: 'plus',
    minus: 'minus',
    negative: 'negativ',
    positive: 'positiv',

    // Currency
    DKK: 'dansk krone',
    EUR: 'euro',
    USD: 'amerikansk dollar',
    GBP: 'britisk pund',
    JPY: 'japansk yen',

    // Units
    thousand: 'tusind',
    million: 'million',
    billion: 'milliard',
    trillion: 'billion',
  },
};
