/**
 * Supported rounding modes
 *
 * - UP: Rounds up (towards positive infinity)
 * - DOWN: Rounds down (towards negative infinity)
 * - CEIL: Rounds up (to the next integer)
 * - FLOOR: Rounds down (to the previous integer)
 * - HALF_UP: Rounds .5 up
 * - HALF_DOWN: Rounds .5 down
 * - HALF_EVEN: Rounds .5 to the nearest even number
 */
export type RoundingMode = 'UP' | 'DOWN' | 'CEIL' | 'FLOOR' | 'HALF_UP' | 'HALF_DOWN' | 'HALF_EVEN';

/**
 * Rounds a number using the specified mode
 * @param num - The number to round
 * @param decimals - Number of decimal places
 * @param mode - Rounding mode
 * @returns The rounded number
 * @throws {Error} If the parameters are invalid
 *
 * @example
 * round(1.235, 2, 'HALF_UP') // 1.24
 * round(1.225, 2, 'HALF_EVEN') // 1.22
 */
export function round(
  num: number | bigint,
  decimals: number,
  mode: RoundingMode = 'HALF_UP'
): number | bigint {
  // If it's a BigInt, it's already an integer, so rounding to decimals > 0 is a no-op in terms of value change
  // unless we wanted to round to tens/hundreds (negative decimals), but the current API implies decimal places.
  // So we just return it as is.
  if (typeof num === 'bigint') {
    return num;
  }

  // Input validation
  if (typeof num !== 'number' || isNaN(num)) {
    throw new Error('Number must be a valid numeric value');
  }

  if (!Number.isInteger(decimals) || decimals < 0) {
    throw new Error('Number of decimal places must be a non-negative integer');
  }

  // Multiply by a factor to move the decimal point
  const factor = Math.pow(10, decimals);

  // Precision adjustments to avoid floating-point errors
  const epsilon = 1e-14;
  const isNegative = num < 0;
  const absNum = Math.abs(num);

  // Move the decimal point and adjust precision
  const shifted = Math.round(absNum * factor * 1e10) / 1e10;
  const floor = Math.floor(shifted);
  const ceil = Math.ceil(shifted);
  const fraction = shifted - floor;

  // Detect numbers close to 0.5
  const isHalf = Math.abs(fraction - 0.5) < epsilon;
  const isAboveHalf = fraction > 0.5 + epsilon;

  let result: number;

  switch (mode) {
    case 'UP':
      // Always rounds towards positive infinity
      result = ceil;
      break;

    case 'DOWN':
      // Always rounds towards negative infinity
      result = floor;
      break;

    case 'CEIL':
      // For positives, rounds up; for negatives, rounds down
      result = isNegative ? floor : ceil;
      break;

    case 'FLOOR':
      // For positives, rounds down; for negatives, rounds up
      result = isNegative ? ceil : floor;
      break;

    case 'HALF_UP':
      // If exactly 0.5 or greater, rounds up
      result = isHalf || isAboveHalf ? ceil : floor;
      break;

    case 'HALF_DOWN':
      // If greater than 0.5, rounds up; if 0.5 or less, rounds down
      result = isAboveHalf ? ceil : floor;
      break;

    case 'HALF_EVEN':
      if (isHalf) {
        // If 0.5, rounds to the nearest even number
        result = floor % 2 === 0 ? floor : ceil;
      } else {
        // If not 0.5, uses the standard rule
        result = isAboveHalf ? ceil : floor;
      }
      break;

    default:
      result = floor;
  }

  // Apply the sign and normalize the result
  const finalResult = (isNegative ? -result : result) / factor;

  // Ensure we don't have more decimal places than requested
  return Number(finalResult.toFixed(decimals));
}
