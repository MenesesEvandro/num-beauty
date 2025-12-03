/**
 * Slovenian locale configuration
 * Separators: . (thousands), , (decimal)
 * Currency: EUR (€)
 */
export const locale = {
  code: 'sl-SI',
  name: 'Slovenščina (Slovenian)',
  masks: {
    postal: '#### ##',
    phone: '+386 (##) ###-###',
    'tax-id': '########',
  },
  currencies: {
    EUR: { symbol: '€', position: 'after' as const },
    USD: { symbol: '$', position: 'before' as const },
  },
  units: [
    ['', ''],
    ['tisoč', 'K'], // tisoč (thousand)
    ['mio.', 'M'], // milijon (million)
    ['mrd.', 'B'], // milijarda (billion)
    ['bil.', 'T'], // bilijon (trillion)
  ] as const,
  speech: {
    numbers: {
      '0': 'nič',
      '1': 'ena',
      '2': 'dva',
      '3': 'tri',
      '4': 'štiri',
      '5': 'pet',
      '6': 'šest',
      '7': 'sedem',
      '8': 'osem',
      '9': 'devet',
      '10': 'deset',
      '11': 'enajst',
      '12': 'dvanajst',
      '13': 'trinajst',
      '14': 'štirinajst',
      '15': 'petnajst',
      '16': 'šestnajst',
      '17': 'sedemnajst',
      '18': 'osemnajst',
      '19': 'devetnajst',
      '20': 'dvajset',
      '30': 'trideset',
      '40': 'štirideset',
      '50': 'petdeset',
      '60': 'šestdeset',
      '70': 'sedemdeset',
      '80': 'osemdeset',
      '90': 'devetdeset',
      '100': 'sto',
      '1000': 'tisoč',
      '1000000': 'milijon',
      '1000000000': 'milijarda',
      '1000000000000': 'bilijon',
    },

    // Currency
    EUR: 'evro',
    USD: 'ameriški dolar',

    // Decimals
    point: 'pika',
    comma: 'vejica',
    decimal: 'vejica',

    // Signs
    plus: 'plus',
    minus: 'minus',
    negative: 'negativno',
    positive: 'pozitivno',

    // Ordinals
    ordinals: {
      '1': 'prvi',
      '2': 'drugi',
      '3': 'tretji',
      '4': 'četrti',
      '5': 'peti',
      '6': 'šesti',
      '7': 'sedmi',
      '8': 'osmi',
      '9': 'deveti',
      '10': 'deseti',
    },
  },
};
