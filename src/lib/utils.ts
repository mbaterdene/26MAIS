/**
 * Bilingual text helper: returns the English or Mongolian value.
 */
export function bil(
  isEnglish: boolean,
  en?: string | null,
  mn?: string
): string {
  if (isEnglish && en) return en;
  return mn ?? en ?? "";
}

/**
 * Format an ISO date string to a human-readable date.
 */
export function formatDate(dateStr?: string | null): string {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

/**
 * Format a number with commas (e.g. 1234 → "1,234").
 */
export function formatNumber(n: number | null | undefined): string {
  if (n == null) return "0";
  return n.toLocaleString("en-US");
}

/**
 * Truncate text to a given number of words.
 */
export function truncateWords(text: string | null | undefined, maxWords: number): string {
  if (!text) return "";
  // Strip HTML tags for a pure-text truncation
  const clean = text.replace(/<[^>]*>/g, "");
  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length <= maxWords) return clean;
  return words.slice(0, maxWords).join(" ") + "…";
}
