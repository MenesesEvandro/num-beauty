/**
 * Bulgarian locale configuration
 * Separators: space (thousands), , (decimal)
 * Currency: BGN (лв)
 */
export const locale = {
  code: 'bg-BG',
  name: 'Български (Bulgarian)',
  masks: {
    postal: '####',
    phone: '+359-##-###-###',
    'tax-id': '##########', // ЕГН (10 digits)
  },
  currencies: {
    BGN: { symbol: 'лв', position: 'after' as const },
    EUR: { symbol: '€', position: 'after' as const },
    USD: { symbol: '$', position: 'before' as const },
  },
  units: [
    ['', ''],
    ['хил.', 'K'], // хиляди (thousand)
    ['млн.', 'M'], // милиони (million)
    ['млрд.', 'B'], // милиарди (billion)
    ['трлн.', 'T'], // трилиони (trillion)
  ] as const,
  speech: {
    // Numbers 0-10
    '0': 'нула',
    '1': 'едно',
    '2': 'две',
    '3': 'три',
    '4': 'четири',
    '5': 'пет',
    '6': 'шест',
    '7': 'седем',
    '8': 'осем',
    '9': 'девет',
    '10': 'десет',

    // Tens
    '20': 'двадесет',
    '30': 'тридесет',
    '40': 'четиридесет',
    '50': 'петдесет',
    '60': 'шестдесет',
    '70': 'седемдесет',
    '80': 'осемдесет',
    '90': 'деветдесет',

    // Hundreds
    '100': 'сто',
    '1000': 'хиляда',
    '1000000': 'един милион',
    '1000000000': 'един милиард',
    '1000000000000': 'един трилион',

    // Decimals
    point: 'запетая',
    comma: 'запетая',
    decimal: 'запетая',

    // Signs
    plus: 'плюс',
    minus: 'минус',
    negative: 'отрицателно',
    positive: 'положително',

    // Currency
    BGN: 'лев',
    EUR: 'евро',
    USD: 'американски долар',
    GBP: 'британска лира',
    JPY: 'японска йена',

    // Units
    thousand: 'хиляда',
    million: 'милион',
    billion: 'милиард',
    trillion: 'трилион',
  },
};
