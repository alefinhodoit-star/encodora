import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()

  // Protect admin panel - require authentication
  if (url.pathname.startsWith('/admin')) {
    const token = request.cookies.get('auth_token')?.value
    if (!token) {
      url.pathname = '/login'
      url.searchParams.set('returnTo', '/admin')
      return NextResponse.redirect(url)
    }
  }

  // Protect blog and portfolio routes - validate ID format
  if (url.pathname.startsWith('/blog/')) {
    const id = url.pathname.split('/')[2]
    if (id && !isNaN(parseInt(id))) {
      url.pathname = `/blog/${id}`
      return NextResponse.redirect(url)
    }
  }

  if (url.pathname.startsWith('/portfolio/')) {
    const id = url.pathname.split('/')[2]
    if (id && !isNaN(parseInt(id))) {
      url.pathname = `/portfolio/${id}`
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/blog/:path*', '/portfolio/:path*'],
}