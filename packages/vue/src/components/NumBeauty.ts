import { defineComponent, h, toRefs, computed, type PropType } from 'vue';
import { useNumBeauty, type UseNumBeautyOptions } from '../composables/index.js';
import { toAccessibleString } from 'num-beauty';

export const NumBeauty = defineComponent({
  name: 'NumBeauty',
  props: {
    value: {
      type: Number,
      required: true,
    },
    options: {
      type: Object as PropType<UseNumBeautyOptions>,
      default: () => ({}),
    },
    // Flattened props for convenience
    locale: String,
    currency: String,
    decimals: Number,
    abbreviated: Boolean,
    bytes: Boolean,
    percentage: Boolean,
    mask: String,
  },
  setup(props, { slots }) {
    const { value, options } = toRefs(props);

    // Merge flattened props into options
    const mergedOptions = computed(
      () =>
        ({
          ...options.value,
          ...(props.locale && { locale: props.locale }),
          ...(props.currency && { currency: props.currency }),
          ...(props.decimals !== undefined && { decimals: props.decimals }),
          ...(props.abbreviated && { abbreviated: true }),
          ...(props.bytes && { bytes: true }),
          ...(props.percentage && { percentage: true }),
          ...(props.mask && { mask: props.mask }),
        } as UseNumBeautyOptions)
    );

    const { formatted, parts } = useNumBeauty(value, mergedOptions);

    const label = computed(() =>
      toAccessibleString(formatted.value, { locale: mergedOptions.value.locale })
    );

    return () => {
      if (slots.default) {
        return slots.default({ formatted: formatted.value, parts: parts.value });
      }
      return h('span', { 'aria-label': label.value }, formatted.value);
    };
  },
});
