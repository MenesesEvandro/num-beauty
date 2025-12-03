import { type SupportedLocale, locales } from '../locales/index.js';

export interface AccessibleOptions {
  locale?: SupportedLocale;
}

/**
 * Converts a formatted number into a screen-reader friendly spoken string
 *
 * @example
 * toAccessibleString('1.2M', { locale: 'pt-BR' }) // 'um ponto dois milhões'
 * toAccessibleString('123M', { locale: 'pt-BR' }) // 'cento e vinte e três milhões'
 * toAccessibleString('R$ 12M', { locale: 'pt-BR' }) // 'doze milhões de reais'
 * toAccessibleString('$1.5k', { locale: 'en-US' }) // 'one point five thousand dollars'
 */
export function toAccessibleString(
  input: string | number,
  options: AccessibleOptions = {}
): string {
  const locale: SupportedLocale = options.locale || 'en-US';
  const loc = locales[locale];
  const speech = loc.speech || {};

  // Helpers
  const decimalSep = getDecimalSeparator(locale);
  const minusWord = speech.minus || 'minus';
  const pointWord = speech.point || 'point';

  // Convert input to string and pre-parse
  let raw = String(input).trim();

  // Detect and strip sign
  let negative = false;
  if (raw.startsWith('-')) {
    negative = true;
    raw = raw.slice(1).trim();
  }

  // Detect currency by symbol
  const currencyMatch = detectCurrency(raw, locale);
  let currencyCode: string | undefined = currencyMatch?.code;
  if (currencyMatch) {
    raw = currencyMatch.rest.trim();
  }

  // Detect unit abbreviation (k, M, mi, etc.) from locale units
  const { unitIndex, rest } = detectUnitAbbreviation(raw, loc.units);
  const hasAbbrev = unitIndex > 0;
  raw = rest.trim();

  // Normalize numeric string to plain format '1234.56'
  const { integerStr, decimalStr } = normalizeNumberText(raw, decimalSep);

  // If nothing numeric, bail out
  if (!integerStr && !decimalStr) return String(input);

  // Build spoken phrase for the numeric part
  let numericPhrase: string;
  const intVal = integerStr ? parseInt(integerStr, 10) : 0;

  if (hasAbbrev) {
    // Speak only the base value; attach scale separately
    numericPhrase = integerAndFractionToWords(intVal, decimalStr, locale);
  } else {
    // Speak full integer with scale composition (thousand, million, ...)
    numericPhrase = integerWithScaleToWords(intVal, locale);
    if (decimalStr) {
      numericPhrase += ' ' + pointWord + ' ' + decimalDigitsToWords(decimalStr, locale);
    }
  }

  // Append abbreviation scale word if present
  if (hasAbbrev) {
    const spokenUnits = speech.units || [['', '']];
    const baseIsSingular = decimalStr ? false : intVal === 1;
    const [singular, plural] = spokenUnits[unitIndex] || ['', ''];
    const unitWord = baseIsSingular ? singular : plural;
    if (unitWord) numericPhrase += ' ' + unitWord;
  }

  // Attach currency if any
  if (currencyCode && speech.currency && speech.currency[currencyCode]) {
    const usePlural = shouldUsePlural(intVal, decimalStr);
    const [singCur, pluCur] = speech.currency[currencyCode];
    const currencyWord = usePlural ? pluCur : singCur;

    // Decide joiner: for languages like pt-BR and es-ES use ' de ' when there is a scale
    const needsStrongJoiner = hasAbbrev || intVal >= 1000;
    const joiner = needsStrongJoiner && speech.currencyJoiner ? speech.currencyJoiner : ' ';
    numericPhrase = `${numericPhrase}${joiner}${currencyWord}`.trim();
  }

  return negative ? `${minusWord} ${numericPhrase}` : numericPhrase;
}

function getDecimalSeparator(locale: SupportedLocale): string {
  try {
    const parts = new Intl.NumberFormat(locale).formatToParts(1.1);
    const dec = parts.find((p) => p.type === 'decimal')?.value;
    return dec || '.';
  } catch {
    return '.';
  }
}

function normalizeNumberText(
  raw: string,
  decimalSep: string
): { integerStr: string; decimalStr: string } {
  // Keep only digits and separators
  let s = raw.replace(/[^0-9,.]/g, '');
  // Choose the last separator (either '.' or ',') as decimal, everything else as grouping
  const lastDot = s.lastIndexOf('.');
  const lastComma = s.lastIndexOf(',');
  const countDots = (s.match(/\./g) || []).length;
  const countCommas = (s.match(/,/g) || []).length;
  let decPos = Math.max(lastDot, lastComma);
  if (decPos === -1) {
    // No decimal separator -> remove all punctuation
    s = s.replace(/[.,]/g, '');
  } else {
    // Heuristic: single separator that is not the locale decimal and followed by 3 digits -> grouping, not decimal
    const sepChar = s[decPos];
    const fracCandidate = s.slice(decPos + 1);
    const singleSep = countDots + countCommas === 1;
    const looksLikeGrouping = singleSep && sepChar !== decimalSep && /^\d{3}$/.test(fracCandidate);
    if (looksLikeGrouping) {
      s = s.replace(/[.,]/g, '');
    } else {
      const intPart = s.slice(0, decPos).replace(/[.,]/g, '');
      const fracPart = s.slice(decPos + 1).replace(/[.,]/g, '');
      s = intPart + (fracPart ? '.' + fracPart : '');
    }
  }
  const [i, d] = s.split('.') as [string, string | undefined];
  return { integerStr: i || '', decimalStr: d || '' };
}

function detectCurrency(
  raw: string,
  locale: SupportedLocale
): { code: string; rest: string } | undefined {
  const cur = locales[locale]?.currencies || {};
  const entries = Object.entries(cur);
  for (const [code, cfg] of entries) {
    if (cfg.position === 'before') {
      const symbol = cfg.symbol;
      if (raw.startsWith(symbol)) {
        const rest = raw.slice(symbol.length).trim();
        return { code, rest };
      }
      if (raw.startsWith(symbol + ' ')) {
        const rest = raw.slice(symbol.length + 1).trim();
        return { code, rest };
      }
    } else {
      const symbol = cfg.symbol;
      if (raw.endsWith(symbol)) {
        const rest = raw.slice(0, -symbol.length).trim();
        return { code, rest };
      }
      if (raw.endsWith(' ' + symbol)) {
        const rest = raw.slice(0, -(symbol.length + 1)).trim();
        return { code, rest };
      }
    }
  }
  return undefined;
}

function detectUnitAbbreviation(
  raw: string,
  units: ReadonlyArray<readonly [string, string]>
): { unitIndex: number; rest: string } {
  let text = raw;
  let matchIndex = 0;
  const lower = raw.toLowerCase();
  // Check from the largest unit to smallest for specificity
  for (let i = units.length - 1; i >= 1; i--) {
    const [sg, pl] = units[i];
    for (const token of [sg, pl]) {
      if (!token) continue;
      const t = token.toLowerCase();
      if (lower.endsWith(' ' + t)) {
        matchIndex = i;
        text = raw.slice(0, -(' ' + token).length);
        return { unitIndex: matchIndex, rest: text };
      }
      if (lower.endsWith(t)) {
        matchIndex = i;
        text = raw.slice(0, -token.length);
        return { unitIndex: matchIndex, rest: text };
      }
    }
  }
  // Fallback: common Latin abbreviations irrespective of locale
  const genericMap: Record<string, number> = {
    k: 1,
    K: 1,
    m: 2,
    M: 2,
    b: 3,
    B: 3,
    t: 4,
    T: 4,
  };
  const lastToken = lower.replace(/.*?([a-zA-Z]+)\s*$/, '$1');
  if (lastToken && genericMap[lastToken] != null) {
    const token = raw.slice(raw.length - lastToken.length);
    text = raw.slice(0, -token.length);
    return { unitIndex: genericMap[lastToken], rest: text };
  }
  return { unitIndex: 0, rest: text };
}

function shouldUsePlural(intVal: number, decimalStr: string) {
  if (decimalStr && decimalStr.replace(/0+$/, '') !== '') return true;
  return intVal !== 1;
}

function integerAndFractionToWords(
  intVal: number,
  decimalStr: string,
  locale: SupportedLocale
): string {
  const pointWord = locales[locale].speech?.point || 'point';
  const intPart = integerToWordsBelowThousandGroups(intVal, locale);
  if (!decimalStr) return intPart;
  const frac = decimalDigitsToWords(decimalStr, locale);
  return `${intPart} ${pointWord} ${frac}`;
}

function integerWithScaleToWords(intVal: number, locale: SupportedLocale): string {
  if (intVal === 0) return (locales[locale].speech?.small || ['zero'])[0] || 'zero';
  return integerToWordsBelowThousandGroups(intVal, locale);
}

function integerToWordsBelowThousandGroups(n: number, locale: SupportedLocale): string {
  const speech = locales[locale].speech || {};
  const unitsWords = speech.units || [
    ['', ''],
    ['thousand', 'thousand'],
    ['million', 'million'],
    ['billion', 'billion'],
  ];
  const parts: string[] = [];
  let i = 0;
  while (n > 0) {
    const chunk = n % 1000;
    if (chunk) {
      const chunkWords = threeDigitsToWords(chunk, locale);
      if (i === 0) {
        parts.unshift(chunkWords);
      } else {
        const singular = chunk === 1;
        const [sg, pl] = unitsWords[i] || ['', ''];
        // Special handling for Portuguese/Spanish thousand = 'mil' (no 'um mil')
        if ((locale.startsWith('pt') || locale.startsWith('es')) && i === 1 && singular) {
          parts.unshift(sg || pl);
        } else {
          const unitWord = singular ? sg || pl : pl || sg;
          parts.unshift(chunkWords + (unitWord ? ' ' + unitWord : ''));
        }
      }
    }
    n = Math.floor(n / 1000);
    i++;
  }
  return parts.join(' ');
}

function threeDigitsToWords(n: number, locale: SupportedLocale): string {
  const speech = locales[locale].speech || {};
  const small = speech.small || [];
  const tens = speech.tens || [];
  const rules = speech.rules || {};
  const hundredsWords = speech.hundredsWords;
  const hundredOneExact = speech.hundredOneExact;

  if (n < 20) return small[n] || String(n);
  if (n < 100) {
    const t = Math.floor(n / 10);
    const u = n % 10;
    if (u === 0) return tens[t] || String(n);
    if (rules.tensHyphenate) return `${tens[t]}-${small[u]}`;
    const joiner = rules.tensJoiner ?? ' ';
    return `${tens[t]}${joiner}${small[u]}`;
  }
  if (n === 100 && hundredOneExact) return hundredOneExact;
  const h = Math.floor(n / 100);
  const r = n % 100;
  const hundredWord = hundredsWords?.[h] || `${small[h]} ${rules.hundredSuffix || 'hundred'}`;
  if (r === 0) return hundredWord;
  const joiner = rules.hundredsJoiner ?? ' ';
  return `${hundredWord}${joiner}${threeDigitsToWords(r, locale)}`;
}

function decimalDigitsToWords(s: string, locale: SupportedLocale): string {
  const speech = locales[locale].speech || {};
  const small = speech.small || [];
  const out: string[] = [];
  for (const ch of s) {
    const d = ch.charCodeAt(0) - 48;
    out.push(small[d] || ch);
  }
  return out.join(' ');
}
