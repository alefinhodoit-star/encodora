import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = cookies()
  const token = cookieStore.get('auth_token')?.value

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  // In a production app, validate token against database/session store
  return NextResponse.json({
    authenticated: true,
    user: { id: '1', name: 'User', email: 'user@example.com' },
  })
}
