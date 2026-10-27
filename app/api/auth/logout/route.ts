import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { invalidateSession, validateCsrfToken } from '@/lib/auth-store'

export async function POST(request: Request) {
  try {
    // CSRF protection
    const cookieStore = cookies()
    const csrfToken = request.headers.get('x-csrf-token') || ''
    const csrfCookie = cookieStore.get('csrf_token')?.value
    
    if (!csrfToken || !csrfCookie || csrfToken !== csrfCookie) {
      return NextResponse.json(
        { error: 'Invalid CSRF token' },
        { status: 403 }
      )
    }
    
    const token = cookieStore.get('auth_token')?.value

    if (token) {
      invalidateSession(token)
    }

    const response = NextResponse.json({ success: true })
    response.cookies.set('auth_token', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 0,
    })
    
    // Clear CSRF cookie
    response.cookies.set('csrf_token', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 0,
    })
    
    return response
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}