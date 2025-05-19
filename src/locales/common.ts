export interface CommonConfig {
  masks: Record<string, string>;
  currencies: Record<string, import('./index').CurrencyConfig>;
}

export const commonConfig: CommonConfig = {
  masks: {
    'credit-card': '#### #### #### ####',
  },
  currencies: {
    // Common currencies for all locales with default configurations
    USD: { symbol: '$', position: 'before' }, // American standard
    EUR: { symbol: '€', position: 'after' }, // European standard
    GBP: { symbol: '£', position: 'before' }, // British standard
  },
} as const;
