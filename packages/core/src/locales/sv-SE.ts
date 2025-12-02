/**
 * Swedish locale configuration
 * Separators: space (thousands), , (decimal)
 * Currency: SEK (kr)
 */
export const locale = {
  code: 'sv-SE',
  name: 'Svenska (Swedish)',
  masks: {
    postal: '### ##',
    phone: '+46-##-###-##-##',
    'tax-id': '############', // Personnummer (12 digits YYYYMMDD-XXXX)
  },
  currencies: {
    SEK: { symbol: 'kr', position: 'after' as const },
    EUR: { symbol: '€', position: 'after' as const },
    USD: { symbol: '$', position: 'before' as const },
  },
  units: [
    ['', ''],
    ['tn', 'K'], // tusen (thousand)
    ['mn', 'M'], // miljon (million)
    ['md', 'B'], // miljard (billion)
    ['bn', 'T'], // biljon (trillion)
  ] as const,
  speech: {
    // Numbers 0-10
    '0': 'noll',
    '1': 'ett',
    '2': 'två',
    '3': 'tre',
    '4': 'fyra',
    '5': 'fem',
    '6': 'sex',
    '7': 'sju',
    '8': 'åtta',
    '9': 'nio',
    '10': 'tio',

    // Tens
    '20': 'tjugo',
    '30': 'trettio',
    '40': 'fyrtio',
    '50': 'femtio',
    '60': 'sextio',
    '70': 'sjuttio',
    '80': 'åttio',
    '90': 'nittio',

    // Hundreds
    '100': 'hundra',
    '1000': 'tusen',
    '1000000': 'en miljon',
    '1000000000': 'en miljard',
    '1000000000000': 'en biljon',

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
    SEK: 'svensk krona',
    EUR: 'euro',
    USD: 'amerikansk dollar',
    GBP: 'brittiskt pund',
    JPY: 'japansk yen',

    // Units
    thousand: 'tusen',
    million: 'miljon',
    billion: 'miljard',
    trillion: 'biljon',
  },
};
