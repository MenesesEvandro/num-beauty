import { type SupportedLocale } from '../locales';

export function formatNumber(
  num: number,
  decimals: number,
  locale: SupportedLocale,
  stripZeros = false
): string {
  // Usar toFixed com o número exato de casas decimais para manter o arredondamento
  let str = Math.abs(num).toFixed(decimals);

  // Encontrar o ponto decimal
  const decimalIndex = str.indexOf('.');

  // Separar parte inteira e decimal
  let integerPart = decimalIndex === -1 ? str : str.slice(0, decimalIndex);
  let decimalPart = decimalIndex === -1 ? '' : str.slice(decimalIndex + 1);

  // Remover zeros à esquerda da parte inteira (exceto se for zero)
  integerPart = integerPart.replace(/^0+(?=\d)/, '');
  if (integerPart === '') integerPart = '0';

  // Remover zeros à direita se stripZeros for true
  if (stripZeros && decimalPart.length > 0) {
    decimalPart = decimalPart.replace(/0+$/, '');
  }

  // Adicionar separadores de milhar usando toLocaleString
  integerPart = parseInt(integerPart).toLocaleString(locale, {
    useGrouping: true,
    maximumFractionDigits: 0,
  });

  // Reconstruir o número
  let result = integerPart;
  if (decimalPart.length > 0 && (!stripZeros || decimalPart !== '')) {
    const decimalSeparator = new Intl.NumberFormat(locale).format(1.1).charAt(1);
    result += decimalSeparator + decimalPart;
  }

  // Adicionar sinal negativo se necessário
  if (num < 0 && !integerPart.includes('-')) result = '-' + result;

  return result;
}
