/**
 * Icelandic locale configuration
 * Separators: . (thousands), , (decimal)
 * Currency: ISK (kr)
 */
export const locale = {
  code: 'is-IS',
  name: 'Íslenska (Icelandic)',
  masks: {
    postal: '###',
    phone: '+354 ### ####',
    'tax-id': '########', // 8 digits
  },
  currencies: {
    ISK: { symbol: 'kr', position: 'after' as const },
    EUR: { symbol: '€', position: 'after' as const },
    USD: { symbol: '$', position: 'before' as const },
  },
  units: [
    ['', ''],
    ['þús.', 'K'], // þúsund (thousand)
    ['m.', 'M'], // milljón (million)
    ['ma.', 'B'], // milljarður (billion)
    ['bill.', 'T'], // billjón (trillion)
  ] as const,
  speech: {
    numbers: {
      '0': 'núll',
      '1': 'einn',
      '2': 'tveir',
      '3': 'þrír',
      '4': 'fjórir',
      '5': 'fimm',
      '6': 'sex',
      '7': 'sjö',
      '8': 'átta',
      '9': 'níu',
      '10': 'tíu',
      '11': 'ellefu',
      '12': 'tólf',
      '13': 'þrettán',
      '14': 'fjórtán',
      '15': 'fimmtán',
      '16': 'sextán',
      '17': 'sautján',
      '18': 'átján',
      '19': 'nítján',
      '20': 'tuttugu',
      '30': 'þrjátíu',
      '40': 'fjörutíu',
      '50': 'fimmtíu',
      '60': 'sextíu',
      '70': 'sjötíu',
      '80': 'áttatíu',
      '90': 'níutíu',
      '100': 'hundrað',
      '1000': 'þúsund',
      '1000000': 'milljón',
      '1000000000': 'milljarður',
      '1000000000000': 'billjón',
    },

    // Currency
    ISK: 'króna',
    EUR: 'evra',
    USD: 'bandaríkjadalur',

    // Decimals
    point: 'punktur',
    comma: 'komma',
    decimal: 'komma',

    // Signs
    plus: 'plús',
    minus: 'mínus',
    negative: 'neikvætt',
    positive: 'jákvætt',

    // Ordinals
    ordinals: {
      '1': 'fyrsti',
      '2': 'annar',
      '3': 'þriðji',
      '4': 'fjórði',
      '5': 'fimmti',
      '6': 'sjötti',
      '7': 'sjöundi',
      '8': 'áttundi',
      '9': 'níundi',
      '10': 'tíundi',
    },
  },
};
