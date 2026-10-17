import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Allow login routes without redirection
  if (pathname === '/admin/login' || pathname.startsWith('/cms/admin/login')) {
    return NextResponse.next()
  }

  // Protect /cms/admin route (Payload CMS)
  if (pathname.startsWith('/cms/admin')) {
    const token = req.cookies.get('payload-token')
    if (!token) {
      return NextResponse.redirect(new URL('/cms/admin/login', req.url))
    }
  }

  // Protect /admin routes — redirect to /admin/login if neither admin session nor payload token exists
  if (pathname.startsWith('/admin')) {
    const token = req.cookies.get('admin-session') || req.cookies.get('payload-token')
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/cms/admin/:path*', '/api/admin/:path*'],
}
