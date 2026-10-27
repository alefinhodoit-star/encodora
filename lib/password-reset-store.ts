interface PasswordResetToken {
  email: string
  token: string
  expires: number
  used: boolean
}

// In-memory password reset token store (in production, use Redis or database)
const resetTokens: Record<string, PasswordResetToken> = {}

export function createPasswordResetToken(email: string): string {
  const token = crypto.randomUUID()
  const expires = Date.now() + 1 * 60 * 60 * 1000 // 1 hour
  
  resetTokens[token] = {
    email,
    token,
    expires,
    used: false,
  }
  
  return token
}

export function validatePasswordResetToken(token: string): PasswordResetToken | null {
  const resetToken = resetTokens[token]
  if (!resetToken) return null
  
  if (resetToken.expires < Date.now()) {
    delete resetTokens[token]
    return null
  }
  
  if (resetToken.used) {
    return null
  }
  
  return resetToken
}

export function markTokenUsed(token: string): void {
  const resetToken = resetTokens[token]
  if (resetToken) {
    resetToken.used = true
  }
}

export function cleanupExpiredTokens(): void {
  const now = Date.now()
  Object.entries(resetTokens).forEach(([token, resetToken]) => {
    if (resetToken.expires < now || resetToken.used) {
      delete resetTokens[token]
    }
  })
}