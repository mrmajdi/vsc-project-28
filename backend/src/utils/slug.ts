/**
 * Generate a URL-friendly slug from a Persian (Farsi) string.
 * The function removes diacritics, converts to lowercase,
 * replaces any non-letter-or-number characters with hyphens,
 * collapses consecutive hyphens, and trims leading/trailing hyphens.
 *
 * @param input - The Persian string to slugify.
 * @returns A slug suitable for use in URLs.
 */
export function generateSlug(input: string): string {
  if (!input) return '';

  // Remove Arabic/Persian diacritics (tashkeel)
  let slug = input.replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, '');

  // Convert to lowercase
  slug = slug.toLowerCase();

  // Replace any character that is not a letter or number with a hyphen
  // Using Unicode property escapes (requires ES2018+)
  slug = slug.replace(/[^\p{L}\p{N}]/gu, '-');

  // Collapse multiple hyphens
  slug = slug.replace(/-{2,}/g, '-');

  // Trim leading and trailing hyphens
  slug = slug.replace(/^-+|-+$/g, '');

  return slug;
}