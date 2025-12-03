import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';
import { useNumBeauty, createNumBeauty } from '../src/index';

const TestComponent = defineComponent({
    template: '<div data-testid="value">{{ formatted }}</div>',
    setup() {
        const { formatted } = useNumBeauty(1234.56);
        return { formatted };
    },
});

describe('Vue Integration', () => {
    test('renders formatted value via composable', () => {
        const wrapper = mount(TestComponent, {
            global: {
                plugins: [createNumBeauty()],
            },
        });
        expect(wrapper.get('[data-testid="value"]').text()).toBe('1,234.56');
    });

    test('renders with locale from plugin options', () => {
        const wrapper = mount(TestComponent, {
            global: {
                plugins: [createNumBeauty({ locale: 'pt-BR' })],
            },
        });
        expect(wrapper.get('[data-testid="value"]').text()).toBe('1.234,56');
    });

    test('renders with local override', () => {
        const LocalOverrideComponent = defineComponent({
            template: '<div data-testid="value">{{ formatted }}</div>',
            setup() {
                const { formatted } = useNumBeauty(1234.56, { locale: 'de-DE' });
                return { formatted };
            },
        });

        const wrapper = mount(LocalOverrideComponent, {
            global: {
                plugins: [createNumBeauty({ locale: 'en-US' })],
            },
        });
        expect(wrapper.get('[data-testid="value"]').text()).toBe('1.234,56');
    });
});
