/**
 * Dutch locale configuration
 * Separators: . (thousands), , (decimal)
 * Currency: EUR (€)
 */
export const locale = {
  code: 'nl-NL',
  name: 'Nederlands (Dutch)',
  masks: {
    postal: '#### @@', // 1234 AB format
    phone: '+31-#-##-##-##-##',
    'tax-id': '#########', // BSN (Burgerservicenummer - 9 digits)
  },
  currencies: {
    EUR: { symbol: '€', position: 'before' as const },
    USD: { symbol: '$', position: 'before' as const },
    GBP: { symbol: '£', position: 'before' as const },
  },
  units: [
    ['', ''],
    ['dzd', 'K'], // duizend (thousand)
    ['mln', 'M'], // million
    ['mld', 'B'], // billion
    ['bln', 'T'], // trillion
  ] as const,
  speech: {
    // Numbers 0-10
    '0': 'nul',
    '1': 'een',
    '2': 'twee',
    '3': 'drie',
    '4': 'vier',
    '5': 'vijf',
    '6': 'zes',
    '7': 'zeven',
    '8': 'acht',
    '9': 'negen',
    '10': 'tien',

    // Tens
    '20': 'twintig',
    '30': 'dertig',
    '40': 'veertig',
    '50': 'vijftig',
    '60': 'zestig',
    '70': 'zeventig',
    '80': 'tachtig',
    '90': 'negentig',

    // Hundreds
    '100': 'honderd',
    '1000': 'duizend',
    '1000000': 'een miljoen',
    '1000000000': 'een miljard',
    '1000000000000': 'een biljoen',

    // Decimals
    point: 'komma',
    comma: 'komma',
    decimal: 'komma',

    // Signs
    plus: 'plus',
    minus: 'min',
    negative: 'negatief',
    positive: 'positief',

    // Currency
    EUR: 'euro',
    USD: 'Amerikaanse dollar',
    GBP: 'Brits pond',
    JPY: 'Japanse yen',
    CHF: 'Zwitserse frank',

    // Units
    thousand: 'duizend',
    million: 'miljoen',
    billion: 'miljard',
    trillion: 'biljoen',
  },
};
