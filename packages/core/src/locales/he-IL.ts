/**
 * Hebrew (Israel) locale configuration
 * Separators: , (thousands), . (decimal)
 * Currency: ILS (₪)
 */
export const locale = {
  code: 'he-IL',
  name: 'עברית (Hebrew)',
  masks: {
    postal: '#####',
    phone: '+972-##-###-####',
    'tax-id': '#########', // 9 digits
  },
  currencies: {
    ILS: { symbol: '₪', position: 'before' as const },
    USD: { symbol: '$', position: 'before' as const },
    EUR: { symbol: '€', position: 'after' as const },
  },
  units: [
    ['', ''],
    ['אלף', 'K'], // thousand
    ['מ׳', 'M'], // million (מיליון)
    ['מיליארד', 'B'], // billion
    ['טריליון', 'T'], // trillion
  ] as const,
  speech: {
    numbers: {
      '0': 'אפס',
      '1': 'אחד',
      '2': 'שניים',
      '3': 'שלושה',
      '4': 'ארבעה',
      '5': 'חמישה',
      '6': 'שישה',
      '7': 'שבעה',
      '8': 'שמונה',
      '9': 'תשעה',
      '10': 'עשר',
      '11': 'אחת עשרה',
      '12': 'שתים עשרה',
      '13': 'שלוש עשרה',
      '14': 'ארבע עשרה',
      '15': 'חמש עשרה',
      '16': 'שש עשרה',
      '17': 'שבע עשרה',
      '18': 'שמונה עשרה',
      '19': 'תשע עשרה',
      '20': 'עשרים',
      '30': 'שלושים',
      '40': 'ארבעים',
      '50': 'חמישים',
      '60': 'שישים',
      '70': 'שבעים',
      '80': 'שמונים',
      '90': 'תשעים',
      '100': 'מאה',
      '1000': 'אלף',
      '1000000': 'מיליון',
      '1000000000': 'מיליארד',
      '1000000000000': 'טריליון',
    },

    // Currency
    ILS: 'שקל',
    USD: 'דולר אמריקאי',
    EUR: 'אירו',

    // Decimals
    point: 'נקודה',
    comma: 'פסיק',
    decimal: 'נקודה',

    // Signs
    plus: 'פלוס',
    minus: 'מינוס',
    negative: 'שלילי',
    positive: 'חיובי',

    // Ordinals (masculine forms)
    ordinals: {
      '1': 'ראשון',
      '2': 'שני',
      '3': 'שלישי',
      '4': 'רביעי',
      '5': 'חמישי',
      '6': 'שישי',
      '7': 'שביעי',
      '8': 'שמיני',
      '9': 'תשיעי',
      '10': 'עשירי',
    },
  },
};
