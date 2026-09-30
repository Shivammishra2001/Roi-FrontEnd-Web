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
