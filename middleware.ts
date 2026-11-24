import { perfectAppAdminUrl } from '@/lib/site-url';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/** /admin on trendevo.com → same path on the panel host (no nginx rules required). */
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  return NextResponse.redirect(perfectAppAdminUrl(pathname, search), 308);
}

export const config = {
  matcher: ['/admin', '/admin/(.*)'],
};