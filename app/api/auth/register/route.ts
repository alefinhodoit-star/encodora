import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createSession } from '@/lib/auth-store'
import { createUser, getUserByEmail } from '@/lib/user-store'

// Simple in-memory rate limiting
const rateLimitStore: Record<string, { count: number; resetTime: number }> = {}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxRequests = 3
  
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

function validatePasswordComplexity(password: string): { valid: boolean; error?: string } {
  if (password.length < 8) {
    return { valid: false, error: 'Password must be at least 8 characters' }
  }
  
  if (!/[A-Z]/.test(password)) {
    return { valid: false, error: 'Password must contain at least one uppercase letter' }
  }
  
  if (!/[a-z]/.test(password)) {
    return { valid: false, error: 'Password must contain at least one lowercase letter' }
  }
  
  if (!/[0-9]/.test(password)) {
    return { valid: false, error: 'Password must contain at least one number' }
  }
  
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return { valid: false, error: 'Password must contain at least one special character' }
  }
  
  return { valid: true }
}

export async function POST(request: Request) {
  try {
    // Get IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    
    // Rate limiting
    cleanupRateLimit()
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many registration attempts. Please try again later.' },
        { status: 429 }
      )
    }
    
    const body = await request.json()
    const { name, email, password, confirmPassword } = body

    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match' },
        { status: 400 }
      )
    }

    // Validate password complexity
    const passwordValidation = validatePasswordComplexity(password)
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { error: passwordValidation.error },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      // Generic error to prevent account enumeration
      return NextResponse.json(
        { error: 'Registration failed' },
        { status: 400 }
      )
    }

    // Create user with hashed password
    const user = await createUser(name, email, password)

    // Create session
    const token = createSession(user.id, user.email, user.name)

    const response = NextResponse.json({ success: true, user: { id: user.id, name: user.name, email: user.email } })

    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: true, // Always secure in production
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })

    return response
  } catch (error) {
    // Log error for security monitoring
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}