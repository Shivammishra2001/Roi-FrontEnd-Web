// Fallback-safe readers for Strapi payloads: a blank or missing CMS value
// falls back to the built-in copy instead of rendering empty.

const isBlank = (v) => v === undefined || v === null || (typeof v === 'string' && v.trim() === '');

// String field -> trimmed value, or fallback when undefined / null / blank.
// Trimming keeps accidental whitespace saved in Strapi from leaving odd gaps.
export function text(value, fallback = '') {
    if (isBlank(value)) return fallback;
    return typeof value === 'string' ? value.trim() : value;
}

// True when a Strapi string field has real (non-whitespace) content. Use to
// conditionally render optional elements so empty fields leave no gap.
export function filled(value) {
    return !isBlank(value);
}

// Array field -> value, or fallback when not an array / empty.
export function list(value, fallback = []) {
    return Array.isArray(value) && value.length > 0 ? value : fallback;
}
