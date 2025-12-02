import { locales, type SupportedLocale } from '../locales/index.js';
import { cache } from './cache.service.js';

/**
 * Obtém todas as máscaras disponíveis para um locale específico
 * @param locale - O código do locale (ex: 'pt-BR', 'en-US')
 * @returns Um objeto com todas as máscaras disponíveis
 */
export function getLocaleMasks(locale: SupportedLocale): Record<string, string> {
  const cacheKey = `masks:${locale}`;
  const cached = cache.get<Record<string, string>>(cacheKey);
  if (cached) return cached;

  const localeMasks = locales[locale].masks;
  cache.set(cacheKey, localeMasks, 3600); // Cache por 1 hora
  return localeMasks;
}

/**
 * Obtém a máscara para um tipo específico de documento em um locale
 * @param locale - O código do locale (ex: 'pt-BR', 'en-US')
 * @param maskType - O tipo de máscara (ex: 'cpf', 'phone', 'ipv4', 'credit-card')
 * @returns O padrão da máscara ou undefined se não existir
 */
export function getMask(locale: SupportedLocale, maskType: string): string | undefined {
  const masks = getLocaleMasks(locale);
  const mask = masks[maskType];

  if (!mask) {
    throw new Error(`Máscara '${maskType}' não encontrada para o locale '${locale}'`);
  }

  return mask;
}

/**
 * Aplica uma máscara a um número ou string
 * @param value - O valor a ser mascarado
 * @param pattern - O padrão da máscara usando # como placeholder para dígitos
 * @returns A string formatada de acordo com a máscara
 * @throws {Error} Se o valor ou padrão forem inválidos
 *
 * @example
 * applyMask(12345678901, '###.###.###-##') // '123.456.789-01'
 * applyMask('12345', '#####-###') // '12345'
 */
export function applyMask(value: number | string, pattern: string): string {
  if (!value || !pattern) {
    throw new Error('Valor e padrão são obrigatórios');
  }

  // Converte para string e remove caracteres não numéricos
  const strValue = String(value);
  const digits = strValue.replace(/\D/g, '');

  // Aplica a máscara
  const chars = pattern.split('');
  let result = '';
  let digitIndex = 0;

  for (const char of chars) {
    if (digitIndex >= digits.length) break;

    if (char === '#') {
      result += digits[digitIndex];
      digitIndex++;
    } else {
      result += char;
    }
  }

  return result;
}
