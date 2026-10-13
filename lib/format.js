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
