/**
 * Latvian locale configuration
 * Separators: space (thousands), , (decimal)
 * Currency: EUR (€)
 */
export const locale = {
  code: 'lv-LV',
  name: 'Latviešu (Latvian)',
  masks: {
    postal: 'LV-####',
    phone: '+371 ## ### ###',
    'tax-id': '###########', // 11 digits
  },
  currencies: {
    EUR: { symbol: '€', position: 'after' as const },
    USD: { symbol: '$', position: 'before' as const },
  },
  units: [
    ['', ''],
    ['tūkst.', 'K'], // tūkstotis (thousand)
    ['milj.', 'M'], // miljons (million)
    ['mljrd.', 'B'], // miljards (billion)
    ['trilj.', 'T'], // triljons (trillion)
  ] as const,
  speech: {
    numbers: {
      '0': 'nulle',
      '1': 'viens',
      '2': 'divi',
      '3': 'trīs',
      '4': 'četri',
      '5': 'pieci',
      '6': 'seši',
      '7': 'septiņi',
      '8': 'astoņi',
      '9': 'deviņi',
      '10': 'desmit',
      '11': 'vienpadsmit',
      '12': 'divpadsmit',
      '13': 'trīspadsmit',
      '14': 'četrpadsmit',
      '15': 'piecpadsmit',
      '16': 'sešpadsmit',
      '17': 'septiņpadsmit',
      '18': 'astoņpadsmit',
      '19': 'deviņpadsmit',
      '20': 'divdesmit',
      '30': 'trīsdesmit',
      '40': 'četrdesmit',
      '50': 'piecdesmit',
      '60': 'sešdesmit',
      '70': 'septiņdesmit',
      '80': 'astoņdesmit',
      '90': 'deviņdesmit',
      '100': 'simts',
      '1000': 'tūkstotis',
      '1000000': 'miljons',
      '1000000000': 'miljards',
      '1000000000000': 'triljons',
    },

    // Currency
    EUR: 'eiro',
    USD: 'ASV dolārs',

    // Decimals
    point: 'punkts',
    comma: 'komats',
    decimal: 'komats',

    // Signs
    plus: 'pluss',
    minus: 'mīnuss',
    negative: 'negatīvs',
    positive: 'pozitīvs',

    // Ordinals
    ordinals: {
      '1': 'pirmais',
      '2': 'otrais',
      '3': 'trešais',
      '4': 'ceturtais',
      '5': 'piektais',
      '6': 'sestais',
      '7': 'septītais',
      '8': 'astotais',
      '9': 'devītais',
      '10': 'desmitais',
    },
  },
};
