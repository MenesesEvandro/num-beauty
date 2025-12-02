<script lang="ts">
  import { beautify, formatCurrency, formatBytes, formatPercentage, toAccessibleString, type NumBeautyOptions } from 'num-beauty';
  import { numBeautyOptions } from './stores.js';

  export let value: number;
  export let locale: string | undefined = undefined;
  export let decimals: number | undefined = undefined;
  export let currency: string | undefined = undefined;
  export let abbreviated: boolean = false;
  export let bytes: boolean = false;
  export let bytesBinary: boolean = true;
  export let percentage: boolean = false;
  export let percentageMultiply: boolean = true;
  export let stripZeros: boolean | undefined = undefined;
  export let mask: string | undefined = undefined;

  $: globalOptions = $numBeautyOptions;

  $: options = {
    locale: locale || globalOptions.locale || 'en-US',
    decimals: decimals !== undefined ? decimals : globalOptions.decimals,
    stripZeros: stripZeros !== undefined ? stripZeros : globalOptions.stripZeros,
    roundingMode: globalOptions.roundingMode,
  };

  $: formatted = (() => {
    if (currency || globalOptions.currency) {
      return formatCurrency(value, options.locale, {
        currency: currency || globalOptions.currency!,
        decimals: options.decimals,
        stripZeros: options.stripZeros,
      });
    }

    if (bytes) {
      return formatBytes(value, {
        locale: options.locale,
        binary: bytesBinary,
        decimals: options.decimals,
      });
    }

    if (percentage) {
      return formatPercentage(value, {
        locale: options.locale,
        decimals: options.decimals,
        multiply: percentageMultiply,
        stripZeros: options.stripZeros,
      });
    }

    const beautifyOptions: NumBeautyOptions = {
      ...options,
      abbreviated,
      mask: mask || globalOptions.mask,
    };

    return beautify(value, beautifyOptions);
  })();

  $: label = toAccessibleString(formatted, { locale: options.locale as any });
</script>

<span aria-label={label}>{formatted}</span>
