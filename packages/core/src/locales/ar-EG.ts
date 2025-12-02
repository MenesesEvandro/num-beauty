export const locale = {
  code: 'ar-EG',
  name: 'العربية (Egyptian Arabic)',
  masks: {
    phone: '###-###-####',
  },
  currencies: {
    EGP: { symbol: 'ج.م', position: 'after' },
    USD: { symbol: '$', position: 'before' },
  },
  units: [
    ['', ''],
    ['ألف', 'ألف'],
    ['مليون', 'مليون'],
    ['مليار', 'مليار'],
  ],
  speech: {
    small: ['صفر', 'واحد', 'اثنان', 'ثلاثة', 'أربعة', 'خمسة', 'ستة', 'سبعة', 'ثمانية', 'تسعة'],
    tens: ['', 'عشرة', 'عشرون', 'ثلاثون', 'أربعون', 'خمسون', 'ستون', 'سبعون', 'ثمانون', 'تسعون'],
    units: [
      ['', ''],
      ['ألف', 'ألف'],
      ['مليون', 'مليون'],
    ],
    point: 'فاصلة',
    minus: 'سالب',
    currency: {
      EGP: ['جنيه', 'جنيه'],
      USD: ['دولار', 'دولار'],
    },
    currencyJoiner: ' ',
  },
} as const;
