/* eslint-env browser */
import '../src/index';

describe('NumBeautyElement', () => {
    let element: HTMLElement;

    beforeEach(() => {
        element = document.createElement('num-beauty');
        document.body.appendChild(element);
    });

    afterEach(() => {
        document.body.removeChild(element);
    });

    test('renders formatted value', () => {
        element.setAttribute('value', '1000');
        // Default locale might be system dependent in JSDOM, let's force one or check loosely
        // Assuming default en-US in core
        expect(element.textContent).toBe('1,000.00');
    });

    test('updates when attribute changes', () => {
        element.setAttribute('value', '1000');
        expect(element.textContent).toBe('1,000.00');

        element.setAttribute('value', '2000');
        expect(element.textContent).toBe('2,000.00');
    });

    test('respects locale attribute', () => {
        element.setAttribute('value', '1000.5');
        element.setAttribute('locale', 'pt-BR');
        expect(element.textContent).toBe('1.000,50');
    });

    test('respects currency attribute', () => {
        element.setAttribute('value', '1000');
        element.setAttribute('currency', 'USD');
        expect(element.textContent).toBe('$1,000.00');
    });

    test('respects abbreviated attribute', () => {
        element.setAttribute('value', '1000000');
        element.setAttribute('abbreviated', '');
        expect(element.textContent).toBe('1m');
    });
    test('sets aria-label', () => {
        element.setAttribute('value', '1000');
        expect(element.getAttribute('aria-label')).toBeTruthy();
    });
});
