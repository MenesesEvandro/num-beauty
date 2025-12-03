/**
 * Lithuanian locale configuration
 * Separators: space (thousands), , (decimal)
 * Currency: EUR (€)
 */
export const locale = {
  code: 'lt-LT',
  name: 'Lietuvių (Lithuanian)',
  masks: {
    postal: 'LT-#####',
    phone: '+370 ### #####',
    'tax-id': '#########',
  },
  currencies: {
    EUR: { symbol: '€', position: 'after' as const },
    USD: { symbol: '$', position: 'before' as const },
  },
  units: [
    ['', ''],
    ['tūkst.', 'K'], // tūkstantis (thousand)
    ['mln', 'M'], // milijonas (million)
    ['mlrd.', 'B'], // milijardas (billion)
    ['trln', 'T'], // trilijonas (trillion)
  ] as const,
  speech: {
    numbers: {
      '0': 'nulis',
      '1': 'vienas',
      '2': 'du',
      '3': 'trys',
      '4': 'keturi',
      '5': 'penki',
      '6': 'šeši',
      '7': 'septyni',
      '8': 'aštuoni',
      '9': 'devyni',
      '10': 'dešimt',
      '11': 'vienuolika',
      '12': 'dvylika',
      '13': 'trylika',
      '14': 'keturiolika',
      '15': 'penkiolika',
      '16': 'šešiolika',
      '17': 'septyniolika',
      '18': 'aštuoniolika',
      '19': 'devyniolika',
      '20': 'dvidešimt',
      '30': 'trisdešimt',
      '40': 'keturiasdešimt',
      '50': 'penkiasdešimt',
      '60': 'šešiasdešimt',
      '70': 'septyniasdešimt',
      '80': 'aštuoniasdešimt',
      '90': 'devyniasdešimt',
      '100': 'šimtas',
      '1000': 'tūkstantis',
      '1000000': 'milijonas',
      '1000000000': 'milijardas',
      '1000000000000': 'trilijonas',
    },

    // Currency
    EUR: 'euras',
    USD: 'JAV doleris',

    // Decimals
    point: 'taškas',
    comma: 'kablelis',
    decimal: 'kablelis',

    // Signs
    plus: 'pliusas',
    minus: 'minusas',
    negative: 'neigiamas',
    positive: 'teigiamas',

    // Ordinals
    ordinals: {
      '1': 'pirmas',
      '2': 'antras',
      '3': 'trečias',
      '4': 'ketvirtas',
      '5': 'penktas',
      '6': 'šeštas',
      '7': 'septintas',
      '8': 'aštuntas',
      '9': 'devintas',
      '10': 'dešimtas',
    },
  },
};
