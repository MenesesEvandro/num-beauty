import { writable } from 'svelte/store';
import type { NumBeautyOptions } from 'num-beauty';

export const numBeautyOptions = writable<NumBeautyOptions>({});
