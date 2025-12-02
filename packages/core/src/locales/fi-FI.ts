/**
 * Finnish locale configuration
 * Separators: space (thousands), , (decimal)
 * Currency: EUR (€)
 */
export const locale = {
  code: 'fi-FI',
  name: 'Suomi (Finnish)',
  masks: {
    postal: '#####',
    phone: '+358-##-###-####',
    'tax-id': '######-####', // Henkilötunnus (DDMMYY-XXXX)
  },
  currencies: {
    EUR: { symbol: '€', position: 'after' as const },
    USD: { symbol: '$', position: 'before' as const },
    GBP: { symbol: '£', position: 'before' as const },
  },
  units: [
    ['', ''],
    ['tuh.', 'K'], // tuhat (thousand)
    ['milj.', 'M'], // miljoona (million)
    ['mrd.', 'B'], // miljardi (billion)
    ['bilj.', 'T'], // biljoona (trillion)
  ] as const,
  speech: {
    // Numbers 0-10
    '0': 'nolla',
    '1': 'yksi',
    '2': 'kaksi',
    '3': 'kolme',
    '4': 'neljä',
    '5': 'viisi',
    '6': 'kuusi',
    '7': 'seitsemän',
    '8': 'kahdeksan',
    '9': 'yhdeksän',
    '10': 'kymmenen',

    // Tens
    '20': 'kaksikymmentä',
    '30': 'kolmekymmentä',
    '40': 'neljäkymmentä',
    '50': 'viisikymmentä',
    '60': 'kuusikymmentä',
    '70': 'seitsemänkymmentä',
    '80': 'kahdeksankymmentä',
    '90': 'yhdeksänkymmentä',

    // Hundreds
    '100': 'sata',
    '1000': 'tuhat',
    '1000000': 'miljoona',
    '1000000000': 'miljardi',
    '1000000000000': 'biljoona',

    // Decimals
    point: 'pilkku',
    comma: 'pilkku',
    decimal: 'pilkku',

    // Signs
    plus: 'plus',
    minus: 'miinus',
    negative: 'negatiivinen',
    positive: 'positiivinen',

    // Currency
    EUR: 'euro',
    USD: 'Yhdysvaltain dollari',
    GBP: 'Englannin punta',
    JPY: 'Japanin jeni',

    // Units
    thousand: 'tuhat',
    million: 'miljoona',
    billion: 'miljardi',
    trillion: 'biljoona',
  },
};
