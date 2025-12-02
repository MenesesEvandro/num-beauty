/**
 * Turkish locale configuration
 * Separators: . (thousands), , (decimal)
 * Currency: TRY (₺)
 */
export const locale = {
  code: 'tr-TR',
  name: 'Türkçe (Turkish)',
  masks: {
    postal: '#####',
    phone: '+90-###-###-##-##',
    'tax-id': '###########', // TC Kimlik No (11 digits)
  },
  currencies: {
    TRY: { symbol: '₺', position: 'before' as const },
    EUR: { symbol: '€', position: 'after' as const },
    USD: { symbol: '$', position: 'before' as const },
  },
  units: [
    ['', ''],
    ['bin', 'K'], // bin (thousand)
    ['mln', 'M'], // milyon (million)
    ['mlr', 'B'], // milyar (billion)
    ['trln', 'T'], // trilyon (trillion)
  ] as const,
  speech: {
    // Numbers 0-10
    '0': 'sıfır',
    '1': 'bir',
    '2': 'iki',
    '3': 'üç',
    '4': 'dört',
    '5': 'beş',
    '6': 'altı',
    '7': 'yedi',
    '8': 'sekiz',
    '9': 'dokuz',
    '10': 'on',

    // Tens
    '20': 'yirmi',
    '30': 'otuz',
    '40': 'kırk',
    '50': 'elli',
    '60': 'altmış',
    '70': 'yetmiş',
    '80': 'seksen',
    '90': 'doksan',

    // Hundreds
    '100': 'yüz',
    '1000': 'bin',
    '1000000': 'bir milyon',
    '1000000000': 'bir milyar',
    '1000000000000': 'bir trilyon',

    // Decimals
    point: 'virgül',
    comma: 'virgül',
    decimal: 'virgül',

    // Signs
    plus: 'artı',
    minus: 'eksi',
    negative: 'negatif',
    positive: 'pozitif',

    // Currency
    TRY: 'Türk lirası',
    EUR: 'Euro',
    USD: 'Amerikan doları',
    GBP: 'İngiliz sterlini',
    JPY: 'Japon yeni',

    // Units
    thousand: 'bin',
    million: 'milyon',
    billion: 'milyar',
    trillion: 'trilyon',
  },
};
