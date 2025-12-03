import { render, screen } from '@solidjs/testing-library';
import { NumBeauty } from '../src/index';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

describe('Solid Component', () => {
    it('renders formatted value', () => {
        render(() => <NumBeauty value={ 1000} />);
        expect(screen.getByText('1,000.00')).toBeInTheDocument();
    });

    it('renders with options', () => {
        render(() => <NumBeauty value={ 1000} currency = "USD" />);
        expect(screen.getByText('$1,000.00')).toBeInTheDocument();
    });

    it('sets aria-label', () => {
        render(() => <NumBeauty value={ 1200000} abbreviated locale = "en-US" />);
        const span = screen.getByText('1.2m');
        expect(span).toHaveAttribute('aria-label', 'one point two million');
    });
});
