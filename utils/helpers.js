/**
 * Format a given date into a readable string.
 * Example: "2025-01-21" → "Jan 21, 2025"
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Shorten long text for UI previews.
 * Example: "This is long text..." → "This is long..."
 */
export function truncate(text, length = 120) {
  if (!text) return "";
  return text.length > length ? text.slice(0, length) + "..." : text;
}

/**
 * Open any URL safely in a new tab.
 */
export function openNewTab(url) {
  if (!url) return;
  window.open(url, "_blank", "noopener,noreferrer");
}

/**
 * Generate a random ID (useful for lists).
 */
export function uid() {
  return Math.random().toString(36).substring(2, 10);
}
