export const locale = {
  code: 'hi-IN',
  name: 'हिन्दी (Hindi)',
  masks: {
    phone: '####-###-####',
    postal: '### ###',
    pan: 'AAAAA####A',
    aadhaar: '####-####-####',
  },
  currencies: {
    INR: { symbol: '₹', position: 'before' },
  },
  units: [
    ['', ''],
    ['हज़ार', 'हज़ार'], // hazaar (thousand)
    ['लाख', 'लाख'], // lakh (hundred thousand)
    ['करोड़', 'करोड़'], // crore (ten million)
    ['अरब', 'अरब'], // arab (billion)
  ],
  speech: {
    small: [
      'शून्य', // shunya (zero)
      'एक', // ek (one)
      'दो', // do (two)
      'तीन', // teen (three)
      'चार', // chaar (four)
      'पांच', // paanch (five)
      'छह', // chhah (six)
      'सात', // saat (seven)
      'आठ', // aath (eight)
      'नौ', // nau (nine)
      'दस', // das (ten)
      'ग्यारह', // gyarah (eleven)
      'बारह', // barah (twelve)
      'तेरह', // terah (thirteen)
      'चौदह', // chaudah (fourteen)
      'पंद्रह', // pandrah (fifteen)
      'सोलह', // solah (sixteen)
      'सत्रह', // satrah (seventeen)
      'अठारह', // atharah (eighteen)
      'उन्नीस', // unnis (nineteen)
    ],
    tens: [
      '',
      'दस', // das (10)
      'बीस', // bees (20)
      'तीस', // tees (30)
      'चालीस', // chaalis (40)
      'पचास', // pachaas (50)
      'साठ', // saath (60)
      'सत्तर', // sattar (70)
      'अस्सी', // assi (80)
      'नब्बे', // nabbe (90)
    ],
    units: [
      ['', ''],
      ['हज़ार', 'हज़ार'],
      ['लाख', 'लाख'],
      ['करोड़', 'करोड़'],
      ['अरब', 'अरब'],
    ],
    point: 'दशमलव', // dashamlav (point)
    minus: 'ऋण', // rin (minus)
    currency: {
      INR: ['रुपया', 'रुपये'], // rupaya/rupaye
    },
    currencyJoiner: ' ',
    rules: {
      tensHyphenate: false,
      tensJoiner: ' ',
      hundredsJoiner: ' ',
      hundredSuffix: 'सौ', // sau
    },
    hundredsWords: [
      '',
      'एक सौ', // ek sau
      'दो सौ', // do sau
      'तीन सौ', // teen sau
      'चार सौ', // chaar sau
      'पांच सौ', // paanch sau
      'छह सौ', // chhah sau
      'सात सौ', // saat sau
      'आठ सौ', // aath sau
      'नौ सौ', // nau sau
    ],
  },
} as const;
