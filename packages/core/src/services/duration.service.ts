/**
 * Options for formatting duration.
 */
export interface DurationOptions {
  /**
   * Format style.
   * 'short': "1h 30m"
   * 'long': "1 hour 30 minutes"
   * @default 'short'
   */
  format?: 'short' | 'long';
}

/**
 * Formats a duration in milliseconds into a human-readable string.
 *
 * @param ms - The duration in milliseconds.
 * @param options - Formatting options.
 * @returns The formatted string.
 */
export function formatDuration(ms: number, options: DurationOptions = {}): string {
  if (ms < 1000) return `${ms}ms`;

  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));

  const parts: string[] = [];
  const long = options.format === 'long';

  if (days > 0) parts.push(long ? `${days} day${days > 1 ? 's' : ''}` : `${days}d`);
  if (hours > 0) parts.push(long ? `${hours} hour${hours > 1 ? 's' : ''}` : `${hours}h`);
  if (minutes > 0) parts.push(long ? `${minutes} minute${minutes > 1 ? 's' : ''}` : `${minutes}m`);
  if (seconds > 0) parts.push(long ? `${seconds} second${seconds > 1 ? 's' : ''}` : `${seconds}s`);

  return parts.join(' ');
}
