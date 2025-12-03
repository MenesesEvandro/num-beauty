export const locale = {
  code: 'ru-RU',
  name: 'Русский (Russian)',
  masks: {
    phone: '+# (###) ###-##-##',
    postal: '######',
    inn: '############',
    snils: '###-###-### ##',
  },
  currencies: {
    RUB: { symbol: '₽', position: 'after' },
  },
  units: [
    ['', ''],
    ['тыс.', 'тыс.'], // tys (thousand)
    ['млн', 'млн'], // mln (million)
    ['млрд', 'млрд'], // mlrd (billion)
    ['трлн', 'трлн'], // trln (trillion)
  ],
  speech: {
    small: [
      'ноль', // nol' (zero)
      'один', // odin (one)
      'два', // dva (two)
      'три', // tri (three)
      'четыре', // chetyre (four)
      'пять', // pyat' (five)
      'шесть', // shest' (six)
      'семь', // sem' (seven)
      'восемь', // vosem' (eight)
      'девять', // devyat' (nine)
      'десять', // desyat' (ten)
      'одиннадцать', // odinnadtsat' (eleven)
      'двенадцать', // dvenadtsat' (twelve)
      'тринадцать', // trinadtsat' (thirteen)
      'четырнадцать', // chetyrnadtsat' (fourteen)
      'пятнадцать', // pyatnadtsat' (fifteen)
      'шестнадцать', // shestnadtsat' (sixteen)
      'семнадцать', // semnadtsat' (seventeen)
      'восемнадцать', // vosemnadtsat' (eighteen)
      'девятнадцать', // devyatnadtsat' (nineteen)
    ],
    tens: [
      '',
      'десять', // desyat' (10)
      'двадцать', // dvadtsat' (20)
      'тридцать', // tridtsat' (30)
      'сорок', // sorok (40)
      'пятьдесят', // pyat'desyat (50)
      'шестьдесят', // shest'desyat (60)
      'семьдесят', // sem'desyat (70)
      'восемьдесят', // vosem'desyat (80)
      'девяносто', // devyanosto (90)
    ],
    units: [
      ['', ''],
      ['тысяча', 'тысячи'], // tysyacha/tysyachi
      ['миллион', 'миллиона'], // million/milliona
      ['миллиард', 'миллиарда'], // milliard/milliarda
      ['триллион', 'триллиона'], // trillion/trilliona
    ],
    point: 'целых', // tselykh (point)
    minus: 'минус', // minus
    currency: {
      RUB: ['рубль', 'рубля'], // rubl'/rublya
    },
    currencyJoiner: ' ',
    rules: {
      tensHyphenate: false,
      tensJoiner: ' ',
      hundredsJoiner: ' ',
      hundredSuffix: 'сто', // sto
    },
    hundredsWords: [
      '',
      'сто', // sto (100)
      'двести', // dvesti (200)
      'триста', // trista (300)
      'четыреста', // chetyresta (400)
      'пятьсот', // pyat'sot (500)
      'шестьсот', // shest'sot (600)
      'семьсот', // sem'sot (700)
      'восемьсот', // vosem'sot (800)
      'девятьсот', // devyat'sot (900)
    ],
  },
} as const;
