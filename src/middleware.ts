import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const userToken = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;
  // const path = request.nextUrl.pathname

  console.log("🚀 ~ middleware ~ userToken:", userToken);

  // Allow access to login and signup pages without a token
  if (pathname === '/login' || pathname === '/signup') {
    if (userToken) {
      // Redirect authenticated users away from login or signup page to dashboard
      const dashboardUrl = new URL('/', request.url);
      return NextResponse.redirect(dashboardUrl);
    }
    return NextResponse.next();
  }

  // Redirect unauthenticated users to login page for protected routes
  if (!userToken) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Allow authenticated users to proceed
  return NextResponse.next();

  // const isPublishPath = path === '/login' 


  // if (isPublishPath && userToken) {
  //   return NextResponse.redirect(new URL('/', request.nextUrl))
  // }

  // if (!isPublishPath && userToken) {
  //   return NextResponse.redirect(new URL('/login', request.redirect))
  // }
}
export const config = {
  matcher: [
    '/',
    '/login',
    '/dashboard',
    '/taskcard'
  ],
}