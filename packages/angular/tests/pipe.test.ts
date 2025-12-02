import { NumBeautyPipe } from '../src/lib/num-beauty.pipe';

describe('NumBeautyPipe', () => {
    let pipe: NumBeautyPipe;

    beforeEach(() => {
        pipe = new NumBeautyPipe();
    });

    it('transforms number', () => {
        expect(pipe.transform(1000)).toBe('1,000.00');
    });

    it('transforms with options', () => {
        expect(pipe.transform(1000, { currency: 'USD' })).toBe('$1,000.00');
    });

    it('handles null/undefined', () => {
        expect(pipe.transform(null)).toBe('');
        expect(pipe.transform(undefined)).toBe('');
    });
});
