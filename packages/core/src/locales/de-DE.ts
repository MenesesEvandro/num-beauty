export const locale = {
  code: 'de-DE',
  name: 'Deutsch (Deutschland)',
  masks: {
    steuernummer: '##/###/#####/#', // Tax number (simplified format)
    'steuer-id': '## ### ### ###', // Tax ID
    plz: '#####', // Postal code
    phone: '#### ########', // Phone number
    iban: 'DE## #### #### #### #### ##', // IBAN (simplified)
    'tax-id': '## ### ### ###',
  },
  currencies: {
    EUR: { symbol: '€', position: 'after' }, // Euro with space: 1.234,56 €
    USD: { symbol: '$', position: 'before' }, // US Dollar
    CHF: { symbol: 'CHF', position: 'after' }, // Swiss Franc
  },
  units: [
    ['', ''],
    ['Tsd.', 'Tsd.'], // Tausend (thousands)
    ['Mio.', 'Mio.'], // Millionen (millions)
    ['Mrd.', 'Mrd.'], // Milliarden (billions)
    ['Bio.', 'Bio.'], // Billionen (trillions)
  ],
  speech: {
    small: [
      'null',
      'eins',
      'zwei',
      'drei',
      'vier',
      'fünf',
      'sechs',
      'sieben',
      'acht',
      'neun',
      'zehn',
      'elf',
      'zwölf',
      'dreizehn',
      'vierzehn',
      'fünfzehn',
      'sechzehn',
      'siebzehn',
      'achtzehn',
      'neunzehn',
    ],
    tens: [
      '',
      '',
      'zwanzig',
      'dreißig',
      'vierzig',
      'fünfzig',
      'sechzig',
      'siebzig',
      'achtzig',
      'neunzig',
    ],
    units: [
      ['', ''],
      ['tausend', 'tausend'],
      ['Million', 'Millionen'],
      ['Milliarde', 'Milliarden'],
      ['Billion', 'Billionen'],
    ],
    point: 'Komma',
    minus: 'minus',
    currency: {
      EUR: ['Euro', 'Euro'],
      USD: ['US-Dollar', 'US-Dollar'],
      BRL: ['Real', 'Real'],
    },
    currencyJoiner: ' ',
  },
} as const;
