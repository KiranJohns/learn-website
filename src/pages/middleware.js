import { NextRequest, NextResponse } from 'next/server';
 
// If the incoming request has the "beta" cookie
// then we'll rewrite the request to /beta
export function middleware(req) {
  const isInBeta = JSON.parse(req.cookies.get('beta') || 'false');
  req.nextUrl.pathname = isInBeta ? '/beta' : '/';
  console.log('hi');
  return NextResponse.rewrite(req.nextUrl);
}
 
// Supports both a single value or an array of matches
export const config = {
  matcher: '/',
};