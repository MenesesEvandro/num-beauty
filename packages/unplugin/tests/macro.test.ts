import { transform } from '../src/core/transform';

describe('Zero-Runtime Macro', () => {
    test('replaces static beautify call', () => {
        const code = 'const result = beautify(100);';
        const output = transform(code, 'test.ts');
        expect(output).toContain('const result = "100.00";');
    });

    test('replaces static beautify call with options', () => {
        const code = "const result = beautify(100, { currency: 'USD' });";
        const output = transform(code, 'test.ts');
        expect(output).toContain('const result = "$100.00";');
    });

    test('replaces static beautify call with abbreviation', () => {
        const code = "const result = beautify(1000000, { abbreviated: true });";
        const output = transform(code, 'test.ts');
        expect(output).toContain('const result = "1m";');
    });

    test('ignores dynamic arguments', () => {
        const code = 'const result = beautify(variable);';
        const output = transform(code, 'test.ts');
        expect(output).toBeUndefined();
    });

    test('ignores dynamic options', () => {
        const code = "const result = beautify(100, { currency: curr });";
        const output = transform(code, 'test.ts');
        expect(output).toBeUndefined();
    });

    test('ignores other function calls', () => {
        const code = 'const result = other(100);';
        const output = transform(code, 'test.ts');
        expect(output).toBeUndefined();
    });
});
