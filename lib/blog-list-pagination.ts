/** Canonical path for the blog index (all list pages point here for SEO). */
export const BLOG_LIST_CANONICAL_PATH = '/blog';

export function blogListPageHref(page: number): string {
  if (page <= 1) {
    return BLOG_LIST_CANONICAL_PATH;
  }
  return `${BLOG_LIST_CANONICAL_PATH}?page=${page}`;
}

/**
 * Resolves the list page from `?page=`. Returns `redirect` when the URL should
 * be normalized to `/blog` (missing param, page 1, or invalid values).
 */
export function resolveBlogListPage(
  pageParam?: string,
): number | 'redirect' {
  if (pageParam === undefined || pageParam === '') {
    return 1;
  }

  const parsed = Number(pageParam);
  if (!Number.isInteger(parsed) || parsed < 1 || parsed === 1) {
    return 'redirect';
  }

  return parsed;
}