export const locale = {
  code: 'ja-JP',
  name: '日本語 (Japanese)',
  masks: {
    postal: '###-####',
    phone: '###-####-####',
    'tax-id': '####-####-####',
  },
  currencies: {
    JPY: { symbol: '¥', position: 'before' },
  },
  units: [
    ['', ''],
    ['千', '千'], // sen (thousand)
    ['万', '万'], // man (ten thousand)
    ['億', '億'], // oku (hundred million)
    ['兆', '兆'], // chō (trillion)
  ],
  speech: {
    small: [
      '零', // zero
      '一', // ichi
      '二', // ni
      '三', // san
      '四', // shi/yon
      '五', // go
      '六', // roku
      '七', // shichi/nana
      '八', // hachi
      '九', // kyū
      '十', // jū
      '十一', // jūichi
      '十二', // jūni
      '十三', // jūsan
      '十四', // jūshi
      '十五', // jūgo
      '十六', // jūroku
      '十七', // jūshichi
      '十八', // jūhachi
      '十九', // jūkyū
    ],
    tens: [
      '',
      '十', // jū (10)
      '二十', // nijū (20)
      '三十', // sanjū (30)
      '四十', // yonjū (40)
      '五十', // gojū (50)
      '六十', // rokujū (60)
      '七十', // nanajū (70)
      '八十', // hachijū (80)
      '九十', // kyūjū (90)
    ],
    units: [
      ['', ''],
      ['千', '千'],
      ['万', '万'],
      ['億', '億'],
      ['兆', '兆'],
    ],
    point: '点', // ten (point)
    minus: 'マイナス', // mainasu (minus)
    currency: {
      JPY: ['円', '円'], // en (yen)
    },
    currencyJoiner: '',
    rules: {
      tensHyphenate: false,
      tensJoiner: '',
      hundredsJoiner: '',
      hundredSuffix: '百', // hyaku
    },
    hundredsWords: [
      '',
      '百', // hyaku
      '二百', // nihyaku
      '三百', // sanbyaku
      '四百', // yonhyaku
      '五百', // gohyaku
      '六百', // roppyaku
      '七百', // nanahyaku
      '八百', // happyaku
      '九百', // kyūhyaku
    ],
  },
} as const;
