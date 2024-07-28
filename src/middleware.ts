import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const userToken = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  console.log("🚀 ~ middleware ~ userToken:", userToken);

  // Redirect unauthenticated users to the login page for all routes except /login and /signup
  if (!userToken) {
    if (pathname !== '/login' && pathname !== '/signup') {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next(); // Allow access to /login and /signup
  }

  // Redirect authenticated users away from the login or signup page to the home page
  if (pathname === '/login' || pathname === '/signup') {
    const homeUrl = new URL('/home', request.url);
    return NextResponse.redirect(homeUrl);
  }

  // Allow authenticated users to proceed to other pages
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/home', '/login', '/signup'],
};
