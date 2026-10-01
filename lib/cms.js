// Fallback-safe readers for Strapi payloads (see the backend's FRONTEND_CONTRACT.md).
// Every component passes its current hard-coded copy as the fallback, so a
// missing field, an empty CMS value or an unreachable API never breaks the UI.

const isBlank = (v) =>
    v === undefined || v === null || (typeof v === 'string' && v.trim() === '');

// String field → value, or fallback when undefined / null / blank.
export function text(value, fallback = '') {
    return isBlank(value) ? fallback : value;
}

// Array field → value, or fallback when not an array / empty.
export function list(value, fallback = []) {
    return Array.isArray(value) && value.length > 0 ? value : fallback;
}

// Link target. '#' and '/#' are CMS placeholders, so a real fallback route wins.
export function href(value, fallback = '#') {
    if (isBlank(value)) return fallback;
    if ((value === '#' || value === '/#') && fallback && fallback !== '#') return fallback;
    return value;
}

// Media object or URL string → URL. Strapi returns uploads root-relative
// (/uploads/x.jpg); Nginx serves those in production, next.config.js rewrites
// them in local dev, so they are returned unchanged.
export function mediaUrl(media, fallback = '') {
    const url = typeof media === 'string' ? media : media?.url;
    return text(url, fallback);
}

// Media object → alt text.
export function mediaAlt(media, fallback = '') {
    return text(media?.alt, fallback);
}

// "2025-09-26" → "September 26, 2025" (the format of the static blog data).
// Anything that isn't an ISO date is returned as-is.
export function formatDate(value, fallback = '') {
    if (isBlank(value)) return fallback;
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    if (!m) return value;
    const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}
