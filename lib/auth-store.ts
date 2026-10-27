interface AuthSession {
  userId: string
  email: string
  name: string
  expires: number
  invalidated: boolean
}

// In-memory session store (in production, use Redis or database)
const sessions: Record<string, AuthSession> = {}

export function createSession(userId: string, email: string, name: string): string {
  const token = crypto.randomUUID()
  const expires = Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
  
  sessions[token] = {
    userId,
    email,
    name,
    expires,
    invalidated: false,
  }
  
  return token
}

export function validateSession(token: string): AuthSession | null {
  const session = sessions[token]
  if (!session) return null
  
  if (session.expires < Date.now()) {
    delete sessions[token]
    return null
  }
  
  if (session.invalidated) {
    delete sessions[token]
    return null
  }
  
  return session
}

export function invalidateSession(token: string): void {
  const session = sessions[token]
  if (session) {
    session.invalidated = true
  }
}

export function cleanupExpiredSessions(): void {
  const now = Date.now()
  Object.entries(sessions).forEach(([token, session]) => {
    if (session.expires < now || session.invalidated) {
      delete sessions[token]
    }
  })
}