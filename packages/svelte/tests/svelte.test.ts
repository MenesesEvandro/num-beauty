import { render, screen } from '@testing-library/svelte';
import NumBeauty from '../src/lib/NumBeauty.svelte';

describe('Svelte Integration', () => {
    test('renders formatted value', () => {
        render(NumBeauty, { props: { value: 1234.56 } });
        expect(screen.getByText('1,234.56')).toBeTruthy();
    });

    test('renders with locale', () => {
        render(NumBeauty, { props: { value: 1234.56, locale: 'pt-BR' } });
        expect(screen.getByText('1.234,56')).toBeTruthy();
    });

    test('renders with currency', () => {
        render(NumBeauty, { props: { value: 1234.56, currency: 'USD' } });
        expect(screen.getByText('$1,234.56')).toBeTruthy();
    });
});
