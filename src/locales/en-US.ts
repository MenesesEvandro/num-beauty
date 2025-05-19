export const locale = {
  code: 'en-US',
  name: 'English (US)',
  masks: {
    ssn: '###-##-####',
    ein: '##-#######',
    zip: '#####',
    phone: '(###) ###-####',
    'tax-id': '###-##-####',
  },
  currencies: {
    // Uses default configurations from common.ts
  },
  units: [
    ['', ''],
    ['k', 'k'],
    ['m', 'm'],
    ['b', 'b'],
    ['t', 't'],
  ],
} as const;
