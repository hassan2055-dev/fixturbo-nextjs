import { NextResponse } from 'next/server';

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Explicitly allow Paddle webhook endpoint - no processing at all
  if (pathname === '/api/mail') {
    // Return early to avoid any processing
    return;
  }

  // Handle the old thank you page URL
  if (pathname === '/11235813.html') {
    return NextResponse.redirect(new URL('/thank-you', request.url));
  }

  // Continue with default behavior for other paths
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Be more specific with matching to avoid catching API routes
    '/11235813.html',
    // Remove /api/mail from matcher to avoid middleware interference
    '/((?!api/mail|_next/static|_next/image|favicon.ico).*)'
  ],
};