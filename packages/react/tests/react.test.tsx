import React from 'react';
import { render, screen } from '@testing-library/react';
import { NumBeautyProvider, useNumBeauty } from '../src/index';

const TestComponent = () => {
    const { formatted } = useNumBeauty(1234.56);
    return <div data-testid="value">{formatted}</div>;
};

describe('React Integration', () => {
    test('renders formatted value via hook', () => {
        render(
            <NumBeautyProvider>
                <TestComponent />
            </NumBeautyProvider>
        );
        expect(screen.getByTestId('value').textContent).toBe('1,234.56');
    });

    test('renders with locale', () => {
        const TestLocale = () => {
            const { formatted } = useNumBeauty(1234.56, { locale: 'pt-BR' });
            return <div data-testid="value-locale">{formatted}</div>;
        };

        render(
            <NumBeautyProvider>
                <TestLocale />
            </NumBeautyProvider>
        );
        expect(screen.getByTestId('value-locale').textContent).toBe('1.234,56');
    });
});
