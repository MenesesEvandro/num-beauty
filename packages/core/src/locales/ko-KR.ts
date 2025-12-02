export const locale = {
  code: 'ko-KR',
  name: '한국어 (Korean)',
  masks: {
    phone: '###-####-####',
    postal: '#####',
    'resident-id': '######-#######',
  },
  currencies: {
    KRW: { symbol: '₩', position: 'before' },
  },
  units: [
    ['', ''],
    ['천', '천'], // cheon (thousand)
    ['만', '만'], // man (ten thousand)
    ['억', '억'], // eok (hundred million)
    ['조', '조'], // jo (trillion)
  ],
  speech: {
    small: [
      '영', // yeong (zero)
      '일', // il (one)
      '이', // i (two)
      '삼', // sam (three)
      '사', // sa (four)
      '오', // o (five)
      '육', // yuk (six)
      '칠', // chil (seven)
      '팔', // pal (eight)
      '구', // gu (nine)
      '십', // sip (ten)
      '십일', // sibil (eleven)
      '십이', // sibi (twelve)
      '십삼', // sipsam (thirteen)
      '십사', // sipsa (fourteen)
      '십오', // sibo (fifteen)
      '십육', // simnyuk (sixteen)
      '십칠', // sipchil (seventeen)
      '십팔', // sippal (eighteen)
      '십구', // sipgu (nineteen)
    ],
    tens: [
      '',
      '십', // sip (10)
      '이십', // isip (20)
      '삼십', // samsip (30)
      '사십', // sasip (40)
      '오십', // osip (50)
      '육십', // yuksip (60)
      '칠십', // chilsip (70)
      '팔십', // palsip (80)
      '구십', // gusip (90)
    ],
    units: [
      ['', ''],
      ['천', '천'],
      ['만', '만'],
      ['억', '억'],
      ['조', '조'],
    ],
    point: '점', // jeom (point)
    minus: '마이너스', // maineoseu (minus)
    currency: {
      KRW: ['원', '원'], // won
    },
    currencyJoiner: ' ',
    rules: {
      tensHyphenate: false,
      tensJoiner: '',
      hundredsJoiner: '',
      hundredSuffix: '백', // baek
    },
    hundredsWords: [
      '',
      '백', // baek (100)
      '이백', // ibaek (200)
      '삼백', // sambaek (300)
      '사백', // sabaek (400)
      '오백', // obaek (500)
      '육백', // yukbaek (600)
      '칠백', // chilbaek (700)
      '팔백', // palbaek (800)
      '구백', // gubaek (900)
    ],
  },
} as const;
