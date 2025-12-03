import { toAccessibleString, registerLocale } from '../src';

describe('toAccessibleString - pt-BR', () => {
  test('converte 1.2M em "um ponto dois milhões"', () => {
    expect(toAccessibleString('1.2M', { locale: 'pt-BR' })).toBe('um ponto dois milhões');
  });

  test('converte 123M em "cento e vinte e três milhões"', () => {
    expect(toAccessibleString('123M', { locale: 'pt-BR' })).toBe('cento e vinte e três milhões');
  });

  test('converte R$ 12M em "doze milhões de reais"', () => {
    expect(toAccessibleString('R$ 12M', { locale: 'pt-BR' })).toBe('doze milhões de reais');
  });

  test('converte 1.234 em "mil duzentos e trinta e quatro"', () => {
    expect(toAccessibleString('1.234', { locale: 'pt-BR' })).toBe('mil duzentos e trinta e quatro');
  });

  test('converte -2,5 mi com vírgula decimal', () => {
    expect(toAccessibleString('-2,5 mi', { locale: 'pt-BR' })).toBe(
      'menos dois ponto cinco milhões'
    );
  });

  test('cem usa forma exata em pt-BR', () => {
    expect(toAccessibleString('100', { locale: 'pt-BR' })).toBe('cem');
  });

  test('zero em pt-BR', () => {
    expect(toAccessibleString('0', { locale: 'pt-BR' })).toBe('zero');
  });
});

describe('toAccessibleString - en-US', () => {
  test('converte $1.5k em "one point five thousand dollars"', () => {
    expect(toAccessibleString('$1.5k', { locale: 'en-US' })).toBe(
      'one point five thousand dollars'
    );
  });

  test('converte 12,345 em "twelve thousand three hundred forty five"', () => {
    const out = toAccessibleString('12,345', { locale: 'en-US' });
    expect(out).toBe('twelve thousand three hundred forty five');
  });

  test('converte abreviação por locale (b) e número negativo', () => {
    expect(toAccessibleString('-2.25b', { locale: 'en-US' })).toBe(
      'minus two point two five billion'
    );
  });
});

describe('toAccessibleString - fr-FR e de-DE (moedas após o número)', () => {
  test('detecta moeda após número (fr-FR)', () => {
    expect(toAccessibleString('12M €', { locale: 'fr-FR' })).toBe('douze millions euros');
  });

  test('detecta moeda após número sem espaço (fr-FR)', () => {
    expect(toAccessibleString('12M€', { locale: 'fr-FR' })).toBe('douze millions euros');
  });

  test('moeda sem nomes falados não é pronunciada (CHF)', () => {
    // CHF está configurado como moeda em de-DE, mas sem nomes em speech.currency
    expect(toAccessibleString('CHF 2M', { locale: 'de-DE' })).toBe('zwei Millionen');
  });
});

describe('toAccessibleString - regras especiais', () => {
  test('hifeniza tens quando configurado via registerLocale', () => {
    registerLocale('en-XA', {
      units: [
        ['', ''],
        ['thousand', 'thousand'],
        ['million', 'million'],
        ['billion', 'billion'],
      ],
      speech: {
        small: [
          'zero',
          'one',
          'two',
          'three',
          'four',
          'five',
          'six',
          'seven',
          'eight',
          'nine',
          'ten',
          'eleven',
          'twelve',
          'thirteen',
          'fourteen',
          'fifteen',
          'sixteen',
          'seventeen',
          'eighteen',
          'nineteen',
        ],
        tens: [
          '',
          '',
          'twenty',
          'thirty',
          'forty',
          'fifty',
          'sixty',
          'seventy',
          'eighty',
          'ninety',
        ],
        rules: { tensHyphenate: true },
        units: [
          ['', ''],
          ['thousand', 'thousand'],
          ['million', 'million'],
          ['billion', 'billion'],
        ],
        point: 'point',
        minus: 'minus',
      },
    });
    expect(toAccessibleString('21', { locale: 'en-XA' })).toBe('twenty-one');
  });
});
