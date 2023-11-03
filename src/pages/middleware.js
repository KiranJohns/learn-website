import { NextResponse } from 'next/server'


export function middleware(req) {
  // get cookie token
  const hasToken =  localStorage.getItem('learnforcare_access')

  // protected routes (admin routes)
  if (req.nextUrl.pathname.startsWith('/company')) {
    if (hasToken) {
      return NextResponse.next()
    } else {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  // login & register routes
  if (['/login', '/register'].includes(req.nextUrl.pathname)) {
    if (hasToken) {
      return NextResponse.redirect(new URL('/company/dashboard', req.url))
    } else {
      return NextResponse.next()
    }
  }
}