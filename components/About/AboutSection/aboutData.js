// Helpers for binding Strapi data to the About sections. Strapi sends null for
// empty fields, so every value falls back to the text/picture built into the
// component: an empty field never breaks or blanks the page.

/** Non-empty string, else the fallback. */
export const text = (value, fallback = '') =>
  typeof value === 'string' && value.trim() ? value : fallback;

/** Non-empty array, else the fallback. */
export const list = (value, fallback = []) =>
  Array.isArray(value) && value.length ? value : fallback;

/** Image URL from a Strapi media object ({ url }) or a plain string, else the fallback. */
export const imageUrl = (value, fallback = '') => {
  if (typeof value === 'string' && value.trim()) return value;
  return value && typeof value.url === 'string' && value.url ? value.url : fallback;
};

/** "Rahul Aggarwal" -> "rahul-aggarwal" (built-in team photos are named this way). */
export const slugify = (value) =>
  String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
