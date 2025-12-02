/**
 * Options for formatting bytes.
 */
export interface ByteOptions {
  /**
   * Number of decimal places.
   * @default 2
   */
  decimals?: number;
}

const UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

/**
 * Formats a number of bytes into a human-readable string.
 *
 * @param bytes - The number of bytes.
 * @param options - Formatting options.
 * @returns The formatted string (e.g., "1.5 MB").
 */
export function formatBytes(bytes: number, options: ByteOptions = {}): string {
  if (bytes === 0) return '0 B';

  const k = 1024;
  const dm = options.decimals !== undefined ? options.decimals : 2;
  const sizes = UNITS;

  const i = Math.floor(Math.log(Math.abs(bytes)) / Math.log(k));

  const decimals = i === 0 ? 0 : dm;
  return (bytes / Math.pow(k, i)).toFixed(decimals) + ' ' + sizes[i];
}
