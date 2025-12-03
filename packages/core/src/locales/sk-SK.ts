/**
 * Slovak locale configuration
 * Separators: space (thousands), , (decimal)
 * Currency: EUR (€)
 */
export const locale = {
  code: 'sk-SK',
  name: 'Slovenčina (Slovak)',
  masks: {
    postal: '### ##',
    phone: '+421-###-###-###',
    'tax-id': '##########', // Rodné číslo (10 digits)
  },
  currencies: {
    EUR: { symbol: '€', position: 'after' as const },
    USD: { symbol: '$', position: 'before' as const },
    CZK: { symbol: 'Kč', position: 'after' as const },
  },
  units: [
    ['', ''],
    ['tis.', 'K'], // tisíc (thousand)
    ['mil.', 'M'], // milión (million)
    ['mld.', 'B'], // miliarda (billion)
    ['bil.', 'T'], // bilión (trillion)
  ] as const,
  speech: {
    // Numbers 0-10
    '0': 'nula',
    '1': 'jeden',
    '2': 'dva',
    '3': 'tri',
    '4': 'štyri',
    '5': 'päť',
    '6': 'šesť',
    '7': 'sedem',
    '8': 'osem',
    '9': 'deväť',
    '10': 'desať',

    // Tens
    '20': 'dvadsať',
    '30': 'tridsať',
    '40': 'štyridsať',
    '50': 'päťdesiat',
    '60': 'šesťdesiat',
    '70': 'sedemdesiat',
    '80': 'osemdesiat',
    '90': 'deväťdesiat',

    // Hundreds
    '100': 'sto',
    '1000': 'tisíc',
    '1000000': 'milión',
    '1000000000': 'miliarda',
    '1000000000000': 'bilión',

    // Decimals
    point: 'čiarka',
    comma: 'čiarka',
    decimal: 'čiarka',

    // Signs
    plus: 'plus',
    minus: 'mínus',
    negative: 'negatívny',
    positive: 'pozitívny',

    // Currency
    EUR: 'euro',
    USD: 'americký dolár',
    GBP: 'britská libra',
    JPY: 'japonský jen',
    CZK: 'česká koruna',

    // Units
    thousand: 'tisíc',
    million: 'milión',
    billion: 'miliarda',
    trillion: 'bilión',
  },
};
