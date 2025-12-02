type CacheEntry<T> = {
  value: T;
  timestamp: number;
  ttl: number;
};

/**
 * Cache em memória com suporte a TTL
 */
class MemoryCache {
  private cache: Map<string, CacheEntry<unknown>> = new Map();

  /**
   * Adiciona ou atualiza um valor no cache
   * @param key - Chave do cache
   * @param value - Valor a ser armazenado
   * @param ttl - Tempo de vida em segundos (0 = sem expiração)
   */
  set<T>(key: string, value: T, ttl = 0): void {
    this.cache.set(key, {
      value,
      timestamp: Date.now(),
      ttl: ttl * 1000,
    });
  }

  /**
   * Obtém um valor do cache
   * @param key - Chave do cache
   * @returns O valor armazenado ou undefined se não existir ou estiver expirado
   */
  get<T>(key: string): T | undefined {
    const entry = this.cache.get(key);
    if (!entry) return undefined;

    // Se tem TTL e já expirou, remove do cache
    if (entry.ttl > 0 && Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return undefined;
    }

    return entry.value as T;
  }

  /**
   * Remove um valor do cache
   * @param key - Chave do cache
   */
  delete(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Limpa todo o cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Obtém um valor do cache ou executa uma função para obtê-lo
   * @param key - Chave do cache
   * @param fn - Função para obter o valor caso não esteja em cache
   * @param ttl - Tempo de vida em segundos
   */
  async getOrSet<T>(key: string, fn: () => Promise<T>, ttl = 0): Promise<T> {
    const cached = this.get<T>(key);
    if (cached !== undefined) return cached;

    const value = await fn();
    this.set(key, value, ttl);
    return value;
  }
}

export const cache = new MemoryCache();
