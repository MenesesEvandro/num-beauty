/* eslint-env browser */
import { beautify, toAccessibleString, type NumBeautyOptions } from 'num-beauty';

export class NumBeautyElement extends HTMLElement {
    static get observedAttributes(): string[] {
        return ['value', 'locale', 'currency', 'decimals', 'abbreviated', 'strip-zeros'];
    }

    constructor() {
        super();
    }

    connectedCallback(): void {
        this.render();
    }

    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    render(): void {
        const valueAttr = this.getAttribute('value');
        if (valueAttr === null) {
            this.textContent = '';
            this.removeAttribute('aria-label');
            return;
        }

        const value = parseFloat(valueAttr);
        if (isNaN(value)) {
            this.textContent = valueAttr; // Or error? Let's just show raw if invalid
            this.removeAttribute('aria-label');
            return;
        }

        const options: NumBeautyOptions = {};

        const locale = this.getAttribute('locale');
        if (locale) options.locale = locale;

        const currency = this.getAttribute('currency');
        if (currency) options.currency = currency;

        const decimals = this.getAttribute('decimals');
        if (decimals) options.decimals = parseInt(decimals, 10);

        if (this.hasAttribute('abbreviated')) {
            options.abbreviated = true;
        }

        if (this.hasAttribute('strip-zeros')) {
            options.stripZeros = true;
        }

        try {
            const formatted = beautify(value, options);
            this.textContent = formatted;
            this.setAttribute('aria-label', toAccessibleString(formatted, { locale: options.locale }));
        } catch {
            this.textContent = valueAttr;
            this.removeAttribute('aria-label');
        }
    }
}

// Register the custom element
if (typeof customElements !== 'undefined' && !customElements.get('num-beauty')) {
    customElements.define('num-beauty', NumBeautyElement);
}
