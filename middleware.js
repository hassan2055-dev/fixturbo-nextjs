import { NextResponse } from 'next/server';

export function middleware(request) {
  // Handle the old thank you page URL
  if (request.nextUrl.pathname === '/11235813.html') {
    return NextResponse.redirect(new URL('/thank-you', request.url));
  }

  if (req.nextUrl.pathname === '/api/mail') {
    return NextResponse.next(); // allow webhook to pass
  }
}

export const config = {
  matcher: '/11235813.html'
};
