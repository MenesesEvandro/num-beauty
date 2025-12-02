/**
 * Greek locale configuration
 * Separators: . (thousands), , (decimal)
 * Currency: EUR (€)
 */
export const locale = {
  code: 'el-GR',
  name: 'Ελληνικά (Greek)',
  masks: {
    postal: '### ##',
    phone: '+30-##-####-####',
    'tax-id': '#########', // ΑΦΜ (9 digits)
  },
  currencies: {
    EUR: { symbol: '€', position: 'after' as const },
    USD: { symbol: '$', position: 'before' as const },
    GBP: { symbol: '£', position: 'before' as const },
  },
  units: [
    ['', ''],
    ['χιλ.', 'K'], // χιλιάδες (thousand)
    ['εκατ.', 'M'], // εκατομμύρια (million)
    ['δισ.', 'B'], // δισεκατομμύρια (billion)
    ['τρισ.', 'T'], // τρισεκατομμύρια (trillion)
  ] as const,
  speech: {
    // Numbers 0-10
    '0': 'μηδέν',
    '1': 'ένα',
    '2': 'δύο',
    '3': 'τρία',
    '4': 'τέσσερα',
    '5': 'πέντε',
    '6': 'έξι',
    '7': 'επτά',
    '8': 'οκτώ',
    '9': 'εννέα',
    '10': 'δέκα',

    // Tens
    '20': 'είκοσι',
    '30': 'τριάντα',
    '40': 'σαράντα',
    '50': 'πενήντα',
    '60': 'εξήντα',
    '70': 'εβδομήντα',
    '80': 'ογδόντα',
    '90': 'ενενήντα',

    // Hundreds
    '100': 'εκατό',
    '1000': 'χίλια',
    '1000000': 'ένα εκατομμύριο',
    '1000000000': 'ένα δισεκατομμύριο',
    '1000000000000': 'ένα τρισεκατομμύριο',

    // Decimals
    point: 'κόμμα',
    comma: 'κόμμα',
    decimal: 'κόμμα',

    // Signs
    plus: 'συν',
    minus: 'πλην',
    negative: 'αρνητικός',
    positive: 'θετικός',

    // Currency
    EUR: 'ευρώ',
    USD: 'αμερικανικό δολάριο',
    GBP: 'βρετανική λίρα',
    JPY: 'ιαπωνικό γιεν',

    // Units
    thousand: 'χίλια',
    million: 'εκατομμύριο',
    billion: 'δισεκατομμύριο',
    trillion: 'τρισεκατομμύριο',
  },
};
