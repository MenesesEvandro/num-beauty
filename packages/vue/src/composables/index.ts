import { computed, unref, type Ref, type ComputedRef } from 'vue';
import {
  beautify,
  formatCurrency,
  formatBytes,
  formatPercentage,
  beautifyToParts,
  type NumBeautyOptions,
  type NumberPart,
  type BeautifyToPartsOptions,
} from 'num-beauty';
import { useNumBeautyOptions } from '../plugin.js';

export type MaybeRef<T> = T | Ref<T>;

export interface UseNumBeautyOptions extends NumBeautyOptions {
  currency?: string;
  percentage?: boolean;
  percentageMultiply?: boolean;
  bytes?: boolean;
  bytesBinary?: boolean;
}

export interface UseNumBeautyResult {
  formatted: ComputedRef<string>;
  parts: ComputedRef<NumberPart[]>;
}

export function useNumBeauty(
  value: MaybeRef<number>,
  options: MaybeRef<UseNumBeautyOptions> = {}
): UseNumBeautyResult {
  const globalOptions = useNumBeautyOptions();

  const mergedOptions = computed(() => {
    const localOptions = unref(options);
    return {
      ...globalOptions,
      ...localOptions,
      // Ensure specific overrides work if global has them but local wants undefined (though spread usually handles this)
      locale: localOptions.locale || globalOptions.locale,
      decimals:
        localOptions.decimals !== undefined ? localOptions.decimals : globalOptions.decimals,
      stripZeros:
        localOptions.stripZeros !== undefined ? localOptions.stripZeros : globalOptions.stripZeros,
    };
  });

  const formatted = computed(() => {
    const val = unref(value);
    const opts = mergedOptions.value;

    if (opts.currency) {
      return formatCurrency(val, opts.locale || 'en-US', {
        currency: opts.currency,
        decimals: opts.decimals,
        stripZeros: opts.stripZeros,
      });
    }

    if (opts.bytes) {
      return formatBytes(val, {
        locale: opts.locale || 'en-US',
        binary: opts.bytesBinary,
        decimals: opts.decimals,
      });
    }

    if (opts.percentage) {
      return formatPercentage(val, {
        locale: opts.locale || 'en-US',
        decimals: opts.decimals,
        multiply: opts.percentageMultiply,
        stripZeros: opts.stripZeros,
      });
    }

    return beautify(val, opts);
  });

  const parts = computed(() => {
    return beautifyToParts(unref(value), mergedOptions.value as BeautifyToPartsOptions);
  });

  return { formatted, parts };
}

export function useCurrency(
  value: MaybeRef<number>,
  currency: MaybeRef<string>,
  options: MaybeRef<Omit<UseNumBeautyOptions, 'currency'>> = {}
): ComputedRef<string> {
  const { formatted } = useNumBeauty(
    value,
    computed(() => ({
      ...unref(options),
      currency: unref(currency),
    }))
  );
  return formatted;
}

export function usePercentage(
  value: MaybeRef<number>,
  options: MaybeRef<Omit<UseNumBeautyOptions, 'percentage'>> = {}
): ComputedRef<string> {
  const { formatted } = useNumBeauty(
    value,
    computed(() => ({
      ...unref(options),
      percentage: true,
    }))
  );
  return formatted;
}

export function useBytes(
  value: MaybeRef<number>,
  options: MaybeRef<Omit<UseNumBeautyOptions, 'bytes'>> = {}
): ComputedRef<string> {
  const { formatted } = useNumBeauty(
    value,
    computed(() => ({
      ...unref(options),
      bytes: true,
    }))
  );
  return formatted;
}

export function useAbbreviated(
  value: MaybeRef<number>,
  options: MaybeRef<Omit<UseNumBeautyOptions, 'abbreviated'>> = {}
): ComputedRef<string> {
  const { formatted } = useNumBeauty(
    value,
    computed(() => ({
      ...unref(options),
      abbreviated: true,
    }))
  );
  return formatted;
}
