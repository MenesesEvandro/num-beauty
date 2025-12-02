<script>import { beautify, formatCurrency, formatBytes, formatPercentage } from "num-beauty";
import { numBeautyOptions } from "./stores.js";
export let value;
export let locale = void 0;
export let decimals = void 0;
export let currency = void 0;
export let abbreviated = false;
export let bytes = false;
export let bytesBinary = true;
export let percentage = false;
export let percentageMultiply = true;
export let stripZeros = void 0;
export let mask = void 0;
$: globalOptions = $numBeautyOptions;
$: options = {
  locale: locale || globalOptions.locale || "en-US",
  decimals: decimals !== void 0 ? decimals : globalOptions.decimals,
  stripZeros: stripZeros !== void 0 ? stripZeros : globalOptions.stripZeros,
  roundingMode: globalOptions.roundingMode
};
$: formatted = (() => {
  if (currency || globalOptions.currency) {
    return formatCurrency(value, options.locale, {
      currency: currency || globalOptions.currency,
      decimals: options.decimals,
      stripZeros: options.stripZeros
    });
  }
  if (bytes) {
    return formatBytes(value, {
      locale: options.locale,
      binary: bytesBinary,
      decimals: options.decimals
    });
  }
  if (percentage) {
    return formatPercentage(value, {
      locale: options.locale,
      decimals: options.decimals,
      multiply: percentageMultiply,
      stripZeros: options.stripZeros
    });
  }
  const beautifyOptions = {
    ...options,
    abbreviated,
    mask: mask || globalOptions.mask
  };
  return beautify(value, beautifyOptions);
})();
</script>

<span>{formatted}</span>
