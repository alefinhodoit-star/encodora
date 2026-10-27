import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createSession } from '@/lib/auth-store'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // In a production app, validate credentials against a database
    // For now, we accept any non-empty credentials and issue a secure token
    const userId = '1'
    const name = email.split('@')[0]
    const token = createSession(userId, email, name)

    const response = NextResponse.json({ success: true, user: { email, name } })

    // Set HttpOnly, Secure, SameSite=Strict cookie
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  }
}