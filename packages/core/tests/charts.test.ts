import { generateSmartTicks } from '../src/index';

describe('Smart Ticks', () => {
  test('generates nice ticks for standard range [0, 100]', () => {
    const ticks = generateSmartTicks(0, 100, 6);
    // Expected: 0, 20, 40, 60, 80, 100
    expect(ticks).toEqual([0, 20, 40, 60, 80, 100]);
  });

  test('generates nice ticks for weird range [0, 33]', () => {
    const ticks = generateSmartTicks(0, 33, 5);
    // Range 33. Interval ~33/4 = 8.25. Nice interval 10.
    // Min 0, Max 40.
    // Ticks: 0, 10, 20, 30, 40.
    expect(ticks).toEqual([0, 10, 20, 30, 40]);
  });

  test('handles negative numbers [-100, 100]', () => {
    const ticks = generateSmartTicks(-100, 100, 5);
    // Range 200. Interval 50.
    // -100, -50, 0, 50, 100.
    expect(ticks).toEqual([-100, -50, 0, 50, 100]);
  });

  test('handles small numbers [0, 0.1]', () => {
    const ticks = generateSmartTicks(0, 0.1, 6);
    // Range 0.1. Interval 0.02.
    // 0, 0.02, 0.04, 0.06, 0.08, 0.1.
    expect(ticks).toEqual([0, 0.02, 0.04, 0.06, 0.08, 0.1]);
  });

  test('handles single value range', () => {
    const ticks = generateSmartTicks(10, 10, 5);
    expect(ticks).toEqual([10]);
  });
});
