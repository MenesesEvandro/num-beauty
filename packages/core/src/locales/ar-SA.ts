export const locale = {
  code: 'ar-SA',
  name: 'العربية (Arabic)',
  masks: {
    phone: '####-###-####',
    postal: '#####',
    'national-id': '##########',
  },
  currencies: {
    SAR: { symbol: 'ر.س', position: 'after' },
    AED: { symbol: 'د.إ', position: 'after' },
  },
  units: [
    ['', ''],
    ['ألف', 'ألف'], // alf (thousand)
    ['مليون', 'مليون'], // milyun (million)
    ['مليار', 'مليار'], // milyar (billion)
    ['تريليون', 'تريليون'], // trillion
  ],
  speech: {
    small: [
      'صفر', // sifr (zero)
      'واحد', // wahid (one)
      'اثنان', // ithnan (two)
      'ثلاثة', // thalatha (three)
      'أربعة', // arba'a (four)
      'خمسة', // khamsa (five)
      'ستة', // sitta (six)
      'سبعة', // sab'a (seven)
      'ثمانية', // thamaniya (eight)
      'تسعة', // tis'a (nine)
      'عشرة', // 'ashara (ten)
      'أحد عشر', // ahad 'ashar (eleven)
      'اثنا عشر', // ithna 'ashar (twelve)
      'ثلاثة عشر', // thalathata 'ashar (thirteen)
      'أربعة عشر', // arba'ata 'ashar (fourteen)
      'خمسة عشر', // khamsata 'ashar (fifteen)
      'ستة عشر', // sittata 'ashar (sixteen)
      'سبعة عشر', // sab'ata 'ashar (seventeen)
      'ثمانية عشر', // thamaniyata 'ashar (eighteen)
      'تسعة عشر', // tis'ata 'ashar (nineteen)
    ],
    tens: [
      '',
      'عشرة', // 'ashara (10)
      'عشرون', // 'ishrun (20)
      'ثلاثون', // thalathun (30)
      'أربعون', // arba'un (40)
      'خمسون', // khamsun (50)
      'ستون', // sittun (60)
      'سبعون', // sab'un (70)
      'ثمانون', // thamanun (80)
      'تسعون', // tis'un (90)
    ],
    units: [
      ['', ''],
      ['ألف', 'ألف'],
      ['مليون', 'مليون'],
      ['مليار', 'مليار'],
      ['تريليون', 'تريليون'],
    ],
    point: 'فاصلة', // fasilah (point)
    minus: 'سالب', // salib (minus)
    currency: {
      SAR: ['ريال', 'ريال'], // riyal
      AED: ['درهم', 'درهم'], // dirham
    },
    currencyJoiner: ' ',
    rules: {
      tensHyphenate: false,
      tensJoiner: ' و ',
      hundredsJoiner: ' و ',
      hundredSuffix: 'مائة', // mi'ah
    },
    hundredsWords: [
      '',
      'مائة', // mi'ah
      'مئتان', // mi'atan
      'ثلاثمائة', // thalathumai'ah
      'أربعمائة', // arba'umai'ah
      'خمسمائة', // khamsumai'ah
      'ستمائة', // sittumai'ah
      'سبعمائة', // sab'umai'ah
      'ثمانمائة', // thamanumai'ah
      'تسعمائة', // tis'umai'ah
    ],
  },
} as const;
