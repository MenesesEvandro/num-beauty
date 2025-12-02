import { Transform } from 'class-transformer';
import { beautify, type NumBeautyOptions } from 'num-beauty';

/**
 * Decorator that automatically formats a number property during serialization.
 * Uses `class-transformer`'s `@Transform`.
 *
 * @param options - Formatting options
 *
 * @example
 * ```typescript
 * class UserDto {
 *   @AutoFormat({ currency: 'USD' })
 *   balance: number;
 * }
 * ```
 */
export function AutoFormat(options: NumBeautyOptions = {}) {
    return Transform(({ value }) => {
        // If value is null/undefined, return as is (or handle based on requirements)
        if (value === null || value === undefined) {
            return value;
        }

        // Try to parse if string, or use as is if number
        const num = typeof value === 'string' ? parseFloat(value) : value;

        if (typeof num !== 'number' && typeof num !== 'bigint') {
            return value;
        }

        if (typeof num === 'number' && isNaN(num)) {
            return value;
        }

        try {
            return beautify(num, options);
        } catch (e) {
            return value;
        }
    });
}
