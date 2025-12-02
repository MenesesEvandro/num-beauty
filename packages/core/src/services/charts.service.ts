/**
 * Generates "smart" ticks for a chart axis.
 * Based on the "Nice Numbers" algorithm.
 *
 * @param min - Minimum value of the data
 * @param max - Maximum value of the data
 * @param count - Desired number of ticks (approximate)
 * @returns Array of tick values
 *
 * @example
 * generateSmartTicks(0, 100, 5) // [0, 20, 40, 60, 80, 100]
 * generateSmartTicks(0, 33, 5) // [0, 10, 20, 30, 40]
 */
export function generateSmartTicks(min: number, max: number, count: number = 10): number[] {
  if (min === max) {
    return [min];
  }

  // Calculate the raw range
  const range = niceNum(max - min, false);

  // Calculate the tick spacing
  const tickSpacing = niceNum(range / (count - 1), true);

  // Calculate the new nice min and max
  const niceMin = Math.floor(min / tickSpacing) * tickSpacing;
  const niceMax = Math.ceil(max / tickSpacing) * tickSpacing;

  // Generate the ticks
  const ticks: number[] = [];
  // Use a small epsilon to handle floating point errors
  const epsilon = tickSpacing / 1000;

  for (let t = niceMin; t <= niceMax + epsilon; t += tickSpacing) {
    // Fix floating point precision issues (e.g. 0.30000000000000004)
    // We assume standard precision is enough, but let's be safe
    // We can use a simple rounding to 10 decimals or so
    ticks.push(Number(t.toPrecision(12)));
  }

  return ticks;
}

/**
 * Returns a "nice" number approximately equal to x.
 * Rounds the number if round=true, takes ceiling if round=false.
 *
 * @param x - The number to normalize
 * @param round - Whether to round the result
 */
function niceNum(x: number, round: boolean): number {
  const exp = Math.floor(Math.log10(x));
  const f = x / Math.pow(10, exp);
  let nf: number;

  if (round) {
    if (f < 1.5) nf = 1;
    else if (f < 3) nf = 2;
    else if (f < 7) nf = 5;
    else nf = 10;
  } else {
    if (f <= 1) nf = 1;
    else if (f <= 2) nf = 2;
    else if (f <= 5) nf = 5;
    else nf = 10;
  }

  return nf * Math.pow(10, exp);
}
