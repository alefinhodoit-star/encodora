import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()

  // Protect admin panel - require authentication token
  if (url.pathname.startsWith('/admin')) {
    const token = request.cookies.get('auth_token')?.value
    if (!token) {
      url.pathname = '/login'
      url.searchParams.set('returnTo', '/admin')
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}