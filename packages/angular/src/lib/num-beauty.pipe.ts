import { Pipe, PipeTransform } from '@angular/core';
import { beautify, toAccessibleString, type NumBeautyOptions } from 'num-beauty';

@Pipe({
    name: 'numBeauty',
    standalone: true
})
export class NumBeautyPipe implements PipeTransform {
    transform(value: number | string | null | undefined, options: NumBeautyOptions = {}): string {
        if (value === null || value === undefined || value === '') {
            return '';
        }

        const num = typeof value === 'string' ? parseFloat(value) : value;
        if (isNaN(num)) {
            return String(value);
        }

        try {
            return beautify(num, options);
        } catch (e) {
            return String(value);
        }
    }
}
