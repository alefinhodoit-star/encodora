import { NextResponse } from 'next/server'
import { createPasswordResetToken } from '@/lib/password-reset-store'

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

export async function POST(request: Request) {
  try {
    // Get IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    
    // Rate limiting
    cleanupRateLimit()
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many password reset requests. Please try again later.' },
        { status: 429 }
      )
    }
    
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // In a production app, look up the user by email and send a reset email
    // For now, we generate a token and return it (in production, email it)
    const token = createPasswordResetToken(email)

    // In production, send email with reset link: /reset-password?token=${token}
    // For demo purposes, we return the token so the UI can use it
    // NOTE: In production, NEVER return the reset token in the response
    return NextResponse.json({
      success: true,
      message: 'If an account exists, a reset email has been sent.',
      // DO NOT include resetToken in production response
      // resetToken: token,
    })
  } catch (error) {
    // Log error for security monitoring
    console.error('Forgot password error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}