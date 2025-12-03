/**
 * Polish locale configuration
 * Separators: space (thousands), , (decimal)
 * Currency: PLN (zł)
 */
export const locale = {
  code: 'pl-PL',
  name: 'Polski (Polish)',
  masks: {
    postal: '##-###',
    phone: '+48-###-###-###',
    'tax-id': '##########', // PESEL (10 digits) or NIP (10 digits)
  },
  currencies: {
    PLN: { symbol: 'zł', position: 'after' as const },
    EUR: { symbol: '€', position: 'after' as const },
    USD: { symbol: '$', position: 'before' as const },
  },
  units: [
    ['', ''],
    ['tys.', 'K'], // tysiąc (thousand)
    ['mln', 'M'], // million
    ['mld', 'B'], // billion
    ['bln', 'T'], // trillion
  ] as const,
  speech: {
    // Numbers 0-10
    '0': 'zero',
    '1': 'jeden',
    '2': 'dwa',
    '3': 'trzy',
    '4': 'cztery',
    '5': 'pięć',
    '6': 'sześć',
    '7': 'siedem',
    '8': 'osiem',
    '9': 'dziewięć',
    '10': 'dziesięć',

    // Tens
    '20': 'dwadzieścia',
    '30': 'trzydzieści',
    '40': 'czterdzieści',
    '50': 'pięćdziesiąt',
    '60': 'sześćdziesiąt',
    '70': 'siedemdziesiąt',
    '80': 'osiemdziesiąt',
    '90': 'dziewięćdziesiąt',

    // Hundreds
    '100': 'sto',
    '1000': 'tysiąc',
    '1000000': 'milion',
    '1000000000': 'miliard',
    '1000000000000': 'bilion',

    // Decimals
    point: 'przecinek',
    comma: 'przecinek',
    decimal: 'przecinek',

    // Signs
    plus: 'plus',
    minus: 'minus',
    negative: 'ujemny',
    positive: 'dodatni',

    // Currency
    PLN: 'złoty',
    EUR: 'euro',
    USD: 'dolar amerykański',
    GBP: 'funt brytyjski',
    JPY: 'jen japoński',
    CHF: 'frank szwajcarski',

    // Units
    thousand: 'tysiąc',
    million: 'milion',
    billion: 'miliard',
    trillion: 'bilion',
  },
};
