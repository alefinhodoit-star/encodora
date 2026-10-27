import { NextResponse, type NextRequest } from 'next/server'
import { generateCsrfToken, startSessionCleanup } from '@/lib/auth-store'
import { startTokenCleanup } from '@/lib/password-reset-store'

// Rate limiting store
const rateLimitStore: Record<string, { count: number; resetTime: number }> = {}

function checkRateLimit(ip: string, maxRequests: number = 100): boolean {
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  
  if (!rateLimitStore[ip]) {
    rateLimitStore[ip] = { count: 1, resetTime: now + windowMs }
    return true
  }
  
  const record = rateLimitStore[ip]
  
  if (now > record.resetTime) {
    rateLimitStore[ip] = { count: 1, resetTime: now + windowMs }
    return true
  }
  
  if (record.count >= maxRequests) {
    return false
  }
  
  record.count++
  return true
}

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const ip = request.headers.get('x-forwarded-for') || 'unknown'
  
  // Start cleanup if not already started
  startSessionCleanup()
  startTokenCleanup()
  
  // Rate limiting for all requests
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    )
  }
  
  // Protect admin panel - require authentication token
  if (url.pathname.startsWith('/admin')) {
    const token = request.cookies.get('auth_token')?.value
    if (!token) {
      url.pathname = '/login'
      url.searchParams.set('returnTo', '/admin')
      return NextResponse.redirect(url)
    }
  }
  
  // Add CSRF token to responses for state-changing operations
  const response = NextResponse.next()
  
  // Set CSRF token cookie for state-changing operations
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
    const csrfToken = generateCsrfToken()
    response.cookies.set('csrf_token', csrfToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    })
  }
  
  return response
}

export const config = {
  matcher: ['/((?!_next/static|favicon\\.ico).*)'],
}