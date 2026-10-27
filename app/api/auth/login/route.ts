import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createSession } from '@/lib/auth-store'
import { validateUser } from '@/lib/user-store'

// Simple in-memory rate limiting
const rateLimitStore: Record<string, { count: number; resetTime: number }> = {}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxRequests = 5
  
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

function cleanupRateLimit(): void {
  const now = Date.now()
  Object.keys(rateLimitStore).forEach((ip) => {
    if (rateLimitStore[ip].resetTime < now) {
      delete rateLimitStore[ip]
    }
  })
}

export async function POST(request: Request) {
  try {
    // Get IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    
    // Rate limiting
    cleanupRateLimit()
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many login attempts. Please try again later.' },
        { status: 429 }
      )
    }
    
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Invalid request' },
        { status: 400 }
      )
    }

    // Validate credentials against user store
    const user = await validateUser(email, password)
    if (!user) {
      // Generic error message to prevent account enumeration
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Create session
    const token = createSession(user.id, user.email, user.name)

    const response = NextResponse.json({ success: true, user: { email: user.email, name: user.name } })

    // Set HttpOnly, Secure, SameSite=Strict cookie
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: true, // Always secure in production
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    // Log error for security monitoring
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}