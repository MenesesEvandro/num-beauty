import { createMemo, splitProps, type Component, type JSX } from 'solid-js';
import { beautify, toAccessibleString, formatBytes, formatPercentage, type NumBeautyOptions } from 'num-beauty';

export interface NumBeautyProps extends NumBeautyOptions, JSX.HTMLAttributes<HTMLSpanElement> {
    value: number;
    bytes?: boolean;
    percentage?: boolean;
}

export const NumBeauty: Component<NumBeautyProps> = (props): JSX.Element => {
    const [local, others] = splitProps(props, [
        'value',
        'locale',
        'currency',
        'decimals',
        'abbreviated',
        'bytes',
        'percentage',
        'mask',
        'stripZeros',
        'roundingMode'
    ]);

    const formatted = createMemo(() => {
        if (local.bytes) {
            return formatBytes(local.value, { decimals: local.decimals });
        }
        if (local.percentage) {
            return formatPercentage(local.value, {
                locale: local.locale,
                decimals: local.decimals,
                stripZeros: local.stripZeros
            });
        }
        return beautify(local.value, {
            locale: local.locale,
            currency: local.currency,
            decimals: local.decimals,
            abbreviated: local.abbreviated,
            mask: local.mask,
            stripZeros: local.stripZeros,
            roundingMode: local.roundingMode
        });
    });

    const label = createMemo(() => toAccessibleString(formatted(), { locale: local.locale }));

    return (
        <span aria-label={label()} {...others}>
            {formatted()}
        </span>
    );
};
