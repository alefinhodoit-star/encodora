import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()

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
  matcher: ['/blog/:path*', '/portfolio/:path*'],
}