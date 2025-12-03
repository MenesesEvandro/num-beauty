import { type App, type InjectionKey, inject } from 'vue';
import { type NumBeautyOptions } from 'num-beauty';

export const NUM_BEAUTY_OPTIONS_KEY: InjectionKey<NumBeautyOptions> = Symbol('NumBeautyOptions');

export function createNumBeauty(options: NumBeautyOptions = {}): { install: (app: App) => void } {
  return {
    install(app: App) {
      app.provide(NUM_BEAUTY_OPTIONS_KEY, options);
    },
  };
}

export function useNumBeautyOptions(): NumBeautyOptions {
  return inject(NUM_BEAUTY_OPTIONS_KEY, {});
}
