import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const SECTION_PATHS = new Set([
  'hero',
  'about',
  'experience',
  'projects',
  'writing',
  'contact',
]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip Next.js internals, API routes, and static assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/icon') ||
    pathname.startsWith('/apple-icon') ||
    pathname.startsWith('/manifest') ||
    pathname.startsWith('/robots.txt') ||
    pathname.startsWith('/sitemap') ||
    pathname.startsWith('/download-resume') ||
    pathname.startsWith('/resume') ||
    pathname.startsWith('/images')
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split('/').filter(Boolean);
  const first = segments[0];

  // Rewrite section paths (e.g., /about) to the homepage so deep links still work
  if (segments.length === 1 && SECTION_PATHS.has(first)) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

// Apply middleware to all routes except Next.js internals handled above
export const config = {
  matcher: '/:path*',
};
