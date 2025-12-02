/**
 * Norwegian Bokmål locale configuration
 * Separators: space (thousands), , (decimal)
 * Currency: NOK (kr)
 */
export const locale = {
  code: 'nb-NO',
  name: 'Norsk bokmål (Norwegian)',
  masks: {
    postal: '####',
    phone: '+47-##-##-##-##',
    'tax-id': '###########', // Fødselsnummer (11 digits)
  },
  currencies: {
    NOK: { symbol: 'kr', position: 'after' as const },
    EUR: { symbol: '€', position: 'after' as const },
    USD: { symbol: '$', position: 'before' as const },
  },
  units: [
    ['', ''],
    ['tus.', 'K'], // tusen (thousand)
    ['mill.', 'M'], // million
    ['mrd.', 'B'], // milliard (billion)
    ['bill.', 'T'], // billion (trillion)
  ] as const,
  speech: {
    // Numbers 0-10
    '0': 'null',
    '1': 'en',
    '2': 'to',
    '3': 'tre',
    '4': 'fire',
    '5': 'fem',
    '6': 'seks',
    '7': 'sju',
    '8': 'åtte',
    '9': 'ni',
    '10': 'ti',

    // Tens
    '20': 'tjue',
    '30': 'tretti',
    '40': 'førti',
    '50': 'femti',
    '60': 'seksti',
    '70': 'sytti',
    '80': 'åtti',
    '90': 'nitti',

    // Hundreds
    '100': 'hundre',
    '1000': 'tusen',
    '1000000': 'en million',
    '1000000000': 'en milliard',
    '1000000000000': 'en billion',

    // Decimals
    point: 'komma',
    comma: 'komma',
    decimal: 'komma',

    // Signs
    plus: 'pluss',
    minus: 'minus',
    negative: 'negativ',
    positive: 'positiv',

    // Currency
    NOK: 'norsk krone',
    EUR: 'euro',
    USD: 'amerikansk dollar',
    GBP: 'britisk pund',
    JPY: 'japansk yen',

    // Units
    thousand: 'tusen',
    million: 'million',
    billion: 'milliard',
    trillion: 'billion',
  },
};
