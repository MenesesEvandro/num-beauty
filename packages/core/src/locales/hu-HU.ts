/**
 * Hungarian locale configuration
 * Separators: space (thousands), , (decimal)
 * Currency: HUF (Ft)
 */
export const locale = {
  code: 'hu-HU',
  name: 'Magyar (Hungarian)',
  masks: {
    postal: '####',
    phone: '+36-##-###-####',
    'tax-id': '##########', // Adóazonosító jel (10 digits)
  },
  currencies: {
    HUF: { symbol: 'Ft', position: 'after' as const },
    EUR: { symbol: '€', position: 'after' as const },
    USD: { symbol: '$', position: 'before' as const },
  },
  units: [
    ['', ''],
    ['E', 'K'], // ezer (thousand)
    ['M', 'M'], // millió (million)
    ['Mrd', 'B'], // milliárd (billion)
    ['B', 'T'], // billió (trillion)
  ] as const,
  speech: {
    // Numbers 0-10
    '0': 'nulla',
    '1': 'egy',
    '2': 'kettő',
    '3': 'három',
    '4': 'négy',
    '5': 'öt',
    '6': 'hat',
    '7': 'hét',
    '8': 'nyolc',
    '9': 'kilenc',
    '10': 'tíz',

    // Tens
    '20': 'húsz',
    '30': 'harminc',
    '40': 'negyven',
    '50': 'ötven',
    '60': 'hatvan',
    '70': 'hetven',
    '80': 'nyolcvan',
    '90': 'kilencven',

    // Hundreds
    '100': 'száz',
    '1000': 'ezer',
    '1000000': 'egymillió',
    '1000000000': 'egymilliárd',
    '1000000000000': 'egybillió',

    // Decimals
    point: 'vessző',
    comma: 'vessző',
    decimal: 'vessző',

    // Signs
    plus: 'plusz',
    minus: 'mínusz',
    negative: 'negatív',
    positive: 'pozitív',

    // Currency
    HUF: 'forint',
    EUR: 'euró',
    USD: 'amerikai dollár',
    GBP: 'font sterling',
    JPY: 'japán jen',

    // Units
    thousand: 'ezer',
    million: 'millió',
    billion: 'milliárd',
    trillion: 'billió',
  },
};
