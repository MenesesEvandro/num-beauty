/* eslint-env jest */
import { cache } from '../src/services/cache.service';

describe('CacheService', () => {
  beforeEach(() => {
    cache.clear();
  });

  it('deve armazenar e recuperar valores', () => {
    cache.set('test', 'value');
    expect(cache.get('test')).toBe('value');
  });

  it('deve respeitar o TTL', async () => {
    cache.set('test', 'value', 1); // 1 segundo TTL
    expect(cache.get('test')).toBe('value');

    await new Promise((resolve) => setTimeout(resolve, 1100));
    expect(cache.get('test')).toBeUndefined();
  });

  it('deve funcionar com getOrSet', async () => {
    let calls = 0;
    const fn = async () => {
      calls++;
      return 'value';
    };

    // Primeira chamada - executa a função
    const result1 = await cache.getOrSet('test', fn);
    expect(result1).toBe('value');
    expect(calls).toBe(1);

    // Segunda chamada - usa o cache
    const result2 = await cache.getOrSet('test', fn);
    expect(result2).toBe('value');
    expect(calls).toBe(1); // Não chamou a função novamente
  });

  it('deve expirar itens do cache', async () => {
    cache.set('test1', 'value1', 1); // 1 segundo TTL
    cache.set('test2', 'value2', 2); // 2 segundos TTL

    expect(cache.get('test1')).toBe('value1');
    expect(cache.get('test2')).toBe('value2');

    await new Promise((resolve) => setTimeout(resolve, 1100));
    expect(cache.get('test1')).toBeUndefined();
    expect(cache.get('test2')).toBe('value2');

    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(cache.get('test2')).toBeUndefined();
  });

  it('deve limpar todo o cache', () => {
    cache.set('test1', 'value1');
    cache.set('test2', 'value2');

    cache.clear();

    expect(cache.get('test1')).toBeUndefined();
    expect(cache.get('test2')).toBeUndefined();
  });

  it('deve funcionar com getOrSet e TTL', async () => {
    let calls = 0;
    const fn = async () => {
      calls++;
      return 'value';
    };

    // Primeira chamada com TTL de 1 segundo
    await cache.getOrSet('test', fn, 1);
    expect(calls).toBe(1);

    // Espera o TTL expirar
    await new Promise((resolve) => setTimeout(resolve, 1100));

    // Segunda chamada após expiração - deve chamar a função novamente
    await cache.getOrSet('test', fn);
    expect(calls).toBe(2);
  });

  it('deve tratar erros na função getOrSet', async () => {
    const errorFn = async () => {
      throw new Error('Erro teste');
    };

    await expect(cache.getOrSet('test', errorFn)).rejects.toThrow('Erro teste');
    expect(cache.get('test')).toBeUndefined(); // Não deve ter armazenado em cache
  });
});
