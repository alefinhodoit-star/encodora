import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createSession } from '@/lib/auth-store'

export async function POST(request: Request) {
  try {
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

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      )
    }

    // In a production app, create user in database
    const userId = '1'
    const token = createSession(userId, email, name)

    const response = NextResponse.json({ success: true, user: { id: userId, name, email } })

    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })

    return response
  } catch {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  }
}