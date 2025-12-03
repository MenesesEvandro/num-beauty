import { execSync } from 'child_process';
import { resolve } from 'path';

const cliPath = resolve(__dirname, '../dist/index.js');

const run = (args: string) => {
    return execSync(`node ${cliPath} ${args}`).toString().trim();
};

describe('CLI Integration', () => {
    test('formats number', () => {
        expect(run('1000')).toBe('1,000.00');
    });

    test('formats with locale', () => {
        expect(run('1000.5 --locale pt-BR')).toBe('1.000,50');
    });

    test('formats with currency', () => {
        expect(run('1000 --currency USD')).toBe('$1,000.00');
    });

    test('formats abbreviated', () => {
        expect(run('1000000 --abbreviated')).toBe('1m');
    });
});
