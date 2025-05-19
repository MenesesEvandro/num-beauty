export const locale = {
  code: 'pt-BR',
  name: 'Português (Brasil)',
  masks: {
    cpf: '###.###.###-##',
    cnpj: '##.###.###/####-##',
    cep: '#####-###',
    phone: '(##) #####-####',
    'tax-id': '###.###.###-##',
  },
  currencies: {
    BRL: { symbol: 'R$', position: 'before' },
    USD: { symbol: 'US$', position: 'before' }, // Sobrescreve o padrão para usar prefixo internacional
  },
  units: [
    ['', ''],
    ['mil', 'mil'],
    ['mi', 'mi'],
    ['bi', 'bi'],
    ['tri', 'tri'],
  ],
} as const;
