import '../src/index';

// Mock globalThis
declare const globalThis: any;

describe('Office Add-in', () => {
    const BEAUTIFY = globalThis.BEAUTIFY;

    test('BEAUTIFY is defined globally', () => {
        expect(typeof BEAUTIFY).toBe('function');
    });

    test('formats number', () => {
        expect(BEAUTIFY(1000)).toBe('1,000.00');
    });

    test('formats with locale', () => {
        expect(BEAUTIFY(1000.5, 'pt-BR')).toBe('1.000,50');
    });

    test('formats with currency', () => {
        expect(BEAUTIFY(1000, undefined, 'USD')).toBe('$1,000.00');
    });

    test('formats with decimals', () => {
        expect(BEAUTIFY(1000.1234, undefined, undefined, 3)).toBe('1,000.123');
    });

    test('formats abbreviated', () => {
        expect(BEAUTIFY(1000000, undefined, undefined, undefined, true)).toBe('1m');
    });

    test('handles invalid input', () => {
        expect(BEAUTIFY('invalid')).toBe('invalid');
    });
});
