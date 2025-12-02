import { Num, num, type NumPlugin } from '../src/fluent';
import type { SupportedLocale } from '../src/locales';
import { vi } from 'vitest';

declare module '../src/fluent' {
  interface Num {
    double(): this;
    forceLocale(locale: SupportedLocale, decimals?: number): this;
  }
}

const doublePlugin: NumPlugin = ({ Num, getState, patchState }) => {
  Num.prototype.double = function doublePluginMethod(this: Num): Num {
    const { value } = getState(this);
    patchState(this, { value: value * 2 });
    return this;
  };
};

const forceLocalePlugin: NumPlugin = ({ Num, patchState }) => {
  Num.prototype.forceLocale = function forceLocaleMethod(
    this: Num,
    locale: SupportedLocale,
    decimals = 2
  ): Num {
    patchState(this, { locale, decimals });
    return this;
  };
};

describe('Num plugins', () => {
  beforeAll(() => {
    Num.extend(doublePlugin);
    Num.extend(forceLocalePlugin);
  });

  it('allows plugins to mutate the internal state safely', () => {
    expect(num(21).double().valueOf()).toBe(42);
  });

  it('supports plugins that tweak formatting options', () => {
    const output = num(1234.56).forceLocale('pt-BR', 3).format();
    expect(output).toBe('1.234,560');
  });

  it('only applies the same plugin once', () => {
    const spy = vi.fn();
    const noopPlugin: NumPlugin = () => {
      spy();
    };

    Num.extend(noopPlugin);
    Num.extend(noopPlugin);

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
