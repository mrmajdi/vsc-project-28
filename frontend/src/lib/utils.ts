/**
 * Utility helpers for slug generation, date formatting, and open/closed logic.
 */

export interface DateFormatOptions extends Intl.DateTimeFormatOptions {
  /** Locale to use for formatting, defaults to user's locale */
  locale?: string;
}

/**
 * Convert a string to a URL-friendly slug.
 * @param input - The string to slugify.
 * @returns A slugified string (lowercase, alphanumeric + hyphens).
 */
export function slugify(input: string): string {
  return input
    .toString()
    .trim()
    .toLowerCase()
    // Replace non-alphanumeric characters (except spaces) with hyphens
    .replace(/[^a-z0-9\s-]/g, '')
    // Replace spaces and multiple hyphens with a single hyphen
    .replace(/[\s_-]+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, '');
}

/**
 * Format a date according to the provided options.
 * @param date - Date to format (Date object or ISO string).
 * @param options - Formatting options (defaults to { year: 'numeric', month: 'short', day: '2-digit' }).
 * @param locale - Locale string (defaults to the environment's locale).
 * @returns Formatted date string.
 */
export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: '2-digit' },
  locale: string = undefined
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(dateObj.getTime())) {
    throw new Error('Invalid date provided to formatDate');
  }
  return new Intl.DateTimeFormat(locale, options).format(dateObj);
}

/**
 * Check if a given time is within opening hours.
 * Assumes opensAt and closesAt are in 24-hour HH:mm format.
 * @param now - The current time to check.
 * @param opensAt - Opening time string (e.g., "09:00").
 * @param closesAt - Closing time string (e.g., "18:00").
 * @returns true if now is between opensAt and closesAt (inclusive of opensAt, exclusive of closesAt).
 */
export function isOpen(now: Date, opensAt: string, closesAt: string): boolean {
  const nowHours = now.getHours();
  const nowMinutes = now.getMinutes();
  const nowTotal = nowHours * 60 + nowMinutes;

  const [openHours, openMinutes] = opensAt.split(':').map(Number);
  const [closeHours, closeMinutes] = closesAt.split(':').map(Number);
  const openTotal = openHours * 60 + openMinutes;
  const closeTotal = closeHours * 60 + closeMinutes;

  // Handle overnight shifts (e.g., 22:00 to 02:00)
  if (closeTotal < openTotal) {
    // Open passes midnight
    return nowTotal >= openTotal || nowTotal < closeTotal;
  }
  return nowTotal >= openTotal && nowTotal < closeTotal;
}

/**
 * Check if a given time is outside opening hours.
 * @param now - The current time to check.
 * @param opensAt - Opening time string (e.g., "09:00").
 * @param closesAt - Closing time string (e.g., "18:00").
 * @returns true if now is outside opening hours.
 */
export function isClosed(now: Date, opensAt: string, closesAt: string): boolean {
  return !isOpen(now, opensAt, closesAt);
}