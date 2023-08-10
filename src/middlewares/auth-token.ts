import { UserToken } from '@/types'
import { JsonWebTokenError } from 'jsonwebtoken'
import { verifyAsync } from '@/helpers/jwt'

const BEARER_REGEX = /^(Bearer)?\s*(.+)\s*/i
export type AuthResult =
  { success: true, user: UserToken } | { success: false, reason: string }

export default async function authToken(request: Request): Promise<AuthResult> {
  // Check that the Authorization header is present
  const token = request.headers.get('authorization')
  if (!token) {
    return { success: false, reason: 'invalid token' }
  }

  // Check that the Authorization header bearer token is in the right format
  const match = BEARER_REGEX.exec(token)
  if (!match || match.length < 3) {
    return { success: false, reason: 'invalid token' }
  }

  const jwtToken = match[2]
  try {
    // Verify the JWT token is valid
    const privateKey = process.env.JWT_SECRET!
    const user = await verifyAsync(jwtToken, privateKey)

    return { success: true, user }
  } catch (err: unknown) {
    const jwtError = err as JsonWebTokenError
    return { success: false, reason: jwtError.message }
  }
}