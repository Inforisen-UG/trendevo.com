/**
 * Canonical public site origin for SEO (sitemap, robots, metadataBase, absolute URLs).
 * Prefer NEXT_PUBLIC_SITE_URL (or SITE_URL); never confuse with NEXT_PUBLIC_PERFECT_APP_URL (panel/app).
 */
export function getSiteUrl(): string {
  const configured =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.SITE_URL?.trim();

  if (configured) {
    return configured.replace(/\/$/, '');
  }

  // Local / preview fallbacks when env is unset
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, '')}`;
  }

  return 'http://localhost:3000';
}

export function absoluteUrl(path = '/'): string {
  const base = getSiteUrl();
  if (!path || path === '/') return base;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Perfect Panel / customer app origin (e.g. https://my.trendevo.com). */
export function getPerfectAppUrl(): string {
  return (
    process.env.NEXT_PUBLIC_PERFECT_APP_URL?.trim().replace(/\/$/, '') ||
    'https://my.trendevo.com'
  );
}

export function perfectAppAdminUrl(pathname: string, search = ''): string {
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${getPerfectAppUrl()}${path}${search}`;
}
