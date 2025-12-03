/**
 * Vietnamese locale configuration
 * Separators: . (thousands), , (decimal)
 * Currency: VND (₫)
 */
export const locale = {
  code: 'vi-VN',
  name: 'Tiếng Việt (Vietnamese)',
  masks: {
    postal: '######',
    phone: '+84 ### ### ###',
    'tax-id': '##########', // MST - 10 digits
  },
  currencies: {
    VND: { symbol: '₫', position: 'after' as const },
    USD: { symbol: '$', position: 'before' as const },
    EUR: { symbol: '€', position: 'after' as const },
  },
  units: [
    ['', ''],
    ['nghìn', 'K'], // thousand
    ['triệu', 'M'], // million
    ['tỷ', 'B'], // billion
    ['nghìn tỷ', 'T'], // trillion
  ] as const,
  speech: {
    numbers: {
      '0': 'không',
      '1': 'một',
      '2': 'hai',
      '3': 'ba',
      '4': 'bốn',
      '5': 'năm',
      '6': 'sáu',
      '7': 'bảy',
      '8': 'tám',
      '9': 'chín',
      '10': 'mười',
      '11': 'mười một',
      '12': 'mười hai',
      '13': 'mười ba',
      '14': 'mười bốn',
      '15': 'mười lăm',
      '16': 'mười sáu',
      '17': 'mười bảy',
      '18': 'mười tám',
      '19': 'mười chín',
      '20': 'hai mươi',
      '30': 'ba mươi',
      '40': 'bốn mươi',
      '50': 'năm mươi',
      '60': 'sáu mươi',
      '70': 'bảy mươi',
      '80': 'tám mươi',
      '90': 'chín mươi',
      '100': 'một trăm',
      '1000': 'một nghìn',
      '1000000': 'một triệu',
      '1000000000': 'một tỷ',
      '1000000000000': 'một nghìn tỷ',
    },

    // Currency
    VND: 'đồng',
    USD: 'đô la Mỹ',
    EUR: 'euro',

    // Decimals
    point: 'chấm',
    comma: 'phẩy',
    decimal: 'phẩy',

    // Signs
    plus: 'cộng',
    minus: 'trừ',
    negative: 'âm',
    positive: 'dương',

    // Ordinals
    ordinals: {
      '1': 'thứ nhất',
      '2': 'thứ hai',
      '3': 'thứ ba',
      '4': 'thứ tư',
      '5': 'thứ năm',
      '6': 'thứ sáu',
      '7': 'thứ bảy',
      '8': 'thứ tám',
      '9': 'thứ chín',
      '10': 'thứ mười',
    },
  },
};
