/**
 * Malay (Malaysia) locale configuration
 * Separators: , (thousands), . (decimal)
 * Currency: MYR (RM)
 */
export const locale = {
  code: 'ms-MY',
  name: 'Bahasa Melayu (Malay)',
  masks: {
    postal: '#####',
    phone: '+60 ##-### ####',
    'tax-id': '##########', // 10 digits
  },
  currencies: {
    MYR: { symbol: 'RM', position: 'before' as const },
    USD: { symbol: '$', position: 'before' as const },
    EUR: { symbol: '€', position: 'after' as const },
  },
  units: [
    ['', ''],
    ['ribu', 'K'], // thousand
    ['juta', 'M'], // million
    ['bilion', 'B'], // billion
    ['trilion', 'T'], // trillion
  ] as const,
  speech: {
    numbers: {
      '0': 'kosong',
      '1': 'satu',
      '2': 'dua',
      '3': 'tiga',
      '4': 'empat',
      '5': 'lima',
      '6': 'enam',
      '7': 'tujuh',
      '8': 'lapan',
      '9': 'sembilan',
      '10': 'sepuluh',
      '11': 'sebelas',
      '12': 'dua belas',
      '13': 'tiga belas',
      '14': 'empat belas',
      '15': 'lima belas',
      '16': 'enam belas',
      '17': 'tujuh belas',
      '18': 'lapan belas',
      '19': 'sembilan belas',
      '20': 'dua puluh',
      '30': 'tiga puluh',
      '40': 'empat puluh',
      '50': 'lima puluh',
      '60': 'enam puluh',
      '70': 'tujuh puluh',
      '80': 'lapan puluh',
      '90': 'sembilan puluh',
      '100': 'seratus',
      '1000': 'seribu',
      '1000000': 'satu juta',
      '1000000000': 'satu bilion',
      '1000000000000': 'satu trilion',
    },

    // Currency
    MYR: 'ringgit',
    USD: 'dolar AS',
    EUR: 'euro',

    // Decimals
    point: 'titik',
    comma: 'koma',
    decimal: 'titik',

    // Signs
    plus: 'tambah',
    minus: 'tolak',
    negative: 'negatif',
    positive: 'positif',

    // Ordinals
    ordinals: {
      '1': 'pertama',
      '2': 'kedua',
      '3': 'ketiga',
      '4': 'keempat',
      '5': 'kelima',
      '6': 'keenam',
      '7': 'ketujuh',
      '8': 'kelapan',
      '9': 'kesembilan',
      '10': 'kesepuluh',
    },
  },
};
