import bcrypt from 'bcryptjs'

interface User {
  id: string
  name: string
  email: string
  passwordHash: string
  createdAt: number
}

// In-memory user store (in production, use database)
const users: Record<string, User> = {}

export async function createUser(name: string, email: string, password: string): Promise<User> {
  const userId = crypto.randomUUID()
  const passwordHash = await bcrypt.hash(password, 12)
  
  const user: User = {
    id: userId,
    name,
    email,
    passwordHash,
    createdAt: Date.now(),
  }
  
  users[email] = user
  return user
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return users[email] || null
}

export async function validateUser(email: string, password: string): Promise<User | null> {
  const user = await getUserByEmail(email)
  if (!user) return null
  
  const isValid = await bcrypt.compare(password, user.passwordHash)
  return isValid ? user : null
}

export function getUserById(userId: string): User | null {
  for (const email in users) {
    if (users[email].id === userId) {
      return users[email]
    }
  }
  return null
}

export function cleanupExpiredUsers(): void {
  // In production, this would clean up inactive users
  // For now, we keep all users
}