/**
 * Portuguese (Portugal) locale configuration
 * Separators: space (thousands), , (decimal)
 * Currency: EUR (€)
 */
export const locale = {
  code: 'pt-PT',
  name: 'Português (Portugal)',
  masks: {
    postal: '####-###',
    phone: '+351 ### ### ###',
    'tax-id': '### ### ###', // NIF - 9 digits
  },
  currencies: {
    EUR: { symbol: '€', position: 'after' as const },
    USD: { symbol: '$', position: 'before' as const },
    GBP: { symbol: '£', position: 'before' as const },
  },
  units: [
    ['', ''],
    ['mil', 'K'], // thousand
    ['M', 'M'], // million (milhão)
    ['MM', 'B'], // billion (mil milhões)
    ['B', 'T'], // trillion (bilião)
  ] as const,
  speech: {
    numbers: {
      '0': 'zero',
      '1': 'um',
      '2': 'dois',
      '3': 'três',
      '4': 'quatro',
      '5': 'cinco',
      '6': 'seis',
      '7': 'sete',
      '8': 'oito',
      '9': 'nove',
      '10': 'dez',
      '11': 'onze',
      '12': 'doze',
      '13': 'treze',
      '14': 'catorze',
      '15': 'quinze',
      '16': 'dezasseis',
      '17': 'dezassete',
      '18': 'dezoito',
      '19': 'dezanove',
      '20': 'vinte',
      '30': 'trinta',
      '40': 'quarenta',
      '50': 'cinquenta',
      '60': 'sessenta',
      '70': 'setenta',
      '80': 'oitenta',
      '90': 'noventa',
      '100': 'cem',
      '1000': 'mil',
      '1000000': 'um milhão',
      '1000000000': 'mil milhões',
      '1000000000000': 'um bilião',
    },

    // Currency
    EUR: 'euro',
    USD: 'dólar americano',
    GBP: 'libra esterlina',

    // Decimals
    point: 'ponto',
    comma: 'vírgula',
    decimal: 'vírgula',

    // Signs
    plus: 'mais',
    minus: 'menos',
    negative: 'negativo',
    positive: 'positivo',

    // Ordinals
    ordinals: {
      '1': 'primeiro',
      '2': 'segundo',
      '3': 'terceiro',
      '4': 'quarto',
      '5': 'quinto',
      '6': 'sexto',
      '7': 'sétimo',
      '8': 'oitavo',
      '9': 'nono',
      '10': 'décimo',
    },
  },
};
