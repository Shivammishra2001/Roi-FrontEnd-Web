// Fallback-safe readers for Strapi payloads: a blank or missing CMS value
// falls back to the built-in copy instead of rendering empty.

const isBlank = (v) => v === undefined || v === null || (typeof v === 'string' && v.trim() === '');

// String field -> value, or fallback when undefined / null / blank.
export function text(value, fallback = '') {
    return isBlank(value) ? fallback : value;
}

// Array field -> value, or fallback when not an array / empty.
export function list(value, fallback = []) {
    return Array.isArray(value) && value.length > 0 ? value : fallback;
}
