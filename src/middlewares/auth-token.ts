import { cookies } from 'next/headers'
import { UserToken } from '@/types'
import { JsonWebTokenError } from 'jsonwebtoken'
import { verifyAsync } from '@/utils/jwt'

const BEARER_REGEX = /^(Bearer)?\s*(.+)\s*/i

export type AuthResult =
  { success: true, user: UserToken } | { success: false, reason: string }

export default async function authToken(request: Request): Promise<AuthResult> {
  // First check if the token has been provided via Authorization header
  let token = request.headers.get('authorization')

  if (token) {
    // Check that the Authorization header bearer token is in the right format
    const match = BEARER_REGEX.exec(token)
    if (!match || match.length < 3) {
      return { success: false, reason: 'invalid token' }
    }

    token = match[2]
  } else {
    // Check if the cookie is present, use that as a fallback
    token = cookies().get('token')?.value ?? null
  }

  // If still no token, throw an error
  if (!token) {
    return { success: false, reason: 'invalid token' }
  }

  try {
    // Verify the JWT token is valid
    const privateKey = process.env.JWT_SECRET!
    const user = await verifyAsync(token, privateKey)

    return { success: true, user }
  } catch (err: unknown) {
    const jwtError = err as JsonWebTokenError
    return { success: false, reason: jwtError.message }
  }
}
