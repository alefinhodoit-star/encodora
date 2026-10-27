import { NextResponse } from 'next/server'
import { createPasswordResetToken } from '@/lib/password-reset-store'

export async function POST(request: Request) {
  try {
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
    return NextResponse.json({
      success: true,
      message: 'If an account exists, a reset email has been sent.',
      resetToken: token,
    })
  } catch {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  }
}