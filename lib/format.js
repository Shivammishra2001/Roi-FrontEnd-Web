/**
 * Strapi `date` fields arrive as "YYYY-MM-DD"; the site shows them as
 * "September 29, 2025". Formatted in UTC with a fixed locale so server and
 * client renders always agree (no hydration mismatch across timezones).
 */
export function formatDate(isoDate) {
  if (!isoDate) return '';
  const date = new Date(`${isoDate}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return isoDate;
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

/**
 * A blog post's category label: the Category picked in Strapi (the
 * `blog_category` relation, null when unset or switched off), then the old
 * free-text `category`, then `fallback`.
 */
export function blogCategoryName(post, fallback = 'MARKETING') {
  return post?.blog_category?.name || post?.category || fallback;
}

/**
 * "B2B & SEO", " b2b-seo ", "B2B and SEO" -> "b2b-seo": lowercase, trimmed,
 * "&"/"and" dropped, anything else that isn't a letter or digit -> "-".
 */
export function categorySlug(value) {
  return String(value ?? '')
    .toLowerCase()
    .trim()
    .replace(/&|\band\b/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Whether a blog post belongs under a filter tab ({ label, value } from the
 * Blog page's filters in Strapi). "all" matches everything. Otherwise the
 * post's category key (set on its Blog Category) is compared with the tab's
 * value, both normalised (categorySlug); a tab whose words are all in the
 * key also matches, e.g. tab "ecommerce" and key "retail-ecommerce". Posts
 * without a key fall back to their category's slug/name, compared the same
 * way with the tab's value and label.
 */
export function blogMatchesFilter(post, filter) {
  const tab = categorySlug(filter?.value);
  if (!tab || tab === 'all') return true;
  const fits = (tabName, name) => {
    const words = new Set(name.split('-'));
    return tabName === name || tabName.split('-').every((w) => words.has(w));
  };
  const postKeys = [post?.categoryKey, post?.blog_category?.categoryKey].map(categorySlug).filter(Boolean);
  if (postKeys.length) return postKeys.some((key) => fits(tab, key));
  const tabNames = [tab, categorySlug(filter?.label)].filter(Boolean);
  const postNames = [post?.blog_category?.slug, post?.blog_category?.name, post?.category].map(categorySlug).filter(Boolean);
  return postNames.some((name) => tabNames.some((t) => fits(t, name)));
}

/**
 * A blog post card's image URL. The cover image is optional (posts imported
 * from Excel may have none yet), so fall back to a generic picture.
 */
export const BLOG_IMAGE_FALLBACK = '/images/blog-card-img.png';
export function blogImageUrl(post) {
  return post?.image?.url || BLOG_IMAGE_FALLBACK;
}
