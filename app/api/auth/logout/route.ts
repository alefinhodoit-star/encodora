import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { invalidateSession } from '@/lib/auth-store'

export async function POST() {
  const cookieStore = cookies()
  const token = cookieStore.get('auth_token')?.value

  if (token) {
    invalidateSession(token)
  }

  const response = NextResponse.json({ success: true })
  response.cookies.set('auth_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  })
  return response
}