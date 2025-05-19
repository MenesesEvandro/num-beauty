export const locale = {
  code: 'es-ES',
  name: 'Español (España)',
  masks: {
    nif: '########-#',
    nie: '#-########',
    cif: '#########',
    phone: '(###) ### ###',
    postal: '#####',
    'tax-id': '#########',
  },
  currencies: {
    USD: { symbol: 'US$', position: 'before' }, // Overwrites default to use international prefix
    EUR: { symbol: '€', position: 'after' },    // Explicitly define EUR for consistent formatting
  },
  units: [
    ['', ''],
    ['mil', 'mil'],
    ['M', 'M'],
    ['MM', 'MM'],
    ['B', 'B'],
  ],
} as const;
