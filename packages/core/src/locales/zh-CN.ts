export const locale = {
  code: 'zh-CN',
  name: '中文 (简体) (Chinese)',
  masks: {
    phone: '###-####-####',
    postal: '######',
    'id-card': '##################',
  },
  currencies: {
    CNY: { symbol: '¥', position: 'before' },
  },
  units: [
    ['', ''],
    ['千', '千'], // qiān (thousand)
    ['万', '万'], // wàn (ten thousand)
    ['亿', '亿'], // yì (hundred million)
    ['兆', '兆'], // zhào (trillion)
  ],
  speech: {
    small: [
      '零', // líng (zero)
      '一', // yī (one)
      '二', // èr (two)
      '三', // sān (three)
      '四', // sì (four)
      '五', // wǔ (five)
      '六', // liù (six)
      '七', // qī (seven)
      '八', // bā (eight)
      '九', // jiǔ (nine)
      '十', // shí (ten)
      '十一', // shíyī (eleven)
      '十二', // shí'èr (twelve)
      '十三', // shísān (thirteen)
      '十四', // shísì (fourteen)
      '十五', // shíwǔ (fifteen)
      '十六', // shíliù (sixteen)
      '十七', // shíqī (seventeen)
      '十八', // shíbā (eighteen)
      '十九', // shíjiǔ (nineteen)
    ],
    tens: [
      '',
      '十', // shí (10)
      '二十', // èrshí (20)
      '三十', // sānshí (30)
      '四十', // sìshí (40)
      '五十', // wǔshí (50)
      '六十', // liùshí (60)
      '七十', // qīshí (70)
      '八十', // bāshí (80)
      '九十', // jiǔshí (90)
    ],
    units: [
      ['', ''],
      ['千', '千'],
      ['万', '万'],
      ['亿', '亿'],
      ['兆', '兆'],
    ],
    point: '点', // diǎn (point)
    minus: '负', // fù (minus)
    currency: {
      CNY: ['元', '元'], // yuán
    },
    currencyJoiner: '',
    rules: {
      tensHyphenate: false,
      tensJoiner: '',
      hundredsJoiner: '',
      hundredSuffix: '百', // bǎi
    },
    hundredsWords: [
      '',
      '一百', // yībǎi
      '二百', // èrbǎi
      '三百', // sānbǎi
      '四百', // sìbǎi
      '五百', // wǔbǎi
      '六百', // liùbǎi
      '七百', // qībǎi
      '八百', // bābǎi
      '九百', // jiǔbǎi
    ],
  },
} as const;
