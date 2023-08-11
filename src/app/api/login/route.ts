import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/db'
import { comparePasswordAsync } from '@/helpers/bcrypt'
import { z } from 'zod'
import validateRequest from '@/middlewares/validate-request'
import { formatZodError } from '@/helpers/zod-errors'
import { LoginRequest } from '@/types'
import { waitDelay } from '@/helpers/time'
import { signAsync } from '@/helpers/jwt'

const JWT_EXPIRATION_SECONDS = 24 * 60 * 60 // 24 hours
const USERNAME_REGEX = /^[0-9a-z]+$/i

const bodySchema = z.object({
  username: z.string()
    .regex(USERNAME_REGEX, 'Username can only contain alphanumeric characters')
    .min(4)
    .max(20)
    .trim()
    .toLowerCase(),

  password: z.string()
    .min(8)
    .max(20),

})

export async function POST(request: Request) {
  const result = await validateRequest<LoginRequest>(request, bodySchema)
  if (!result.success) {
    const validationMessage = formatZodError(result.error)
    return NextResponse.json({
        message: validationMessage,
        errors: result.error.errors,
      },
      { status: 400 },
    )
  }

  // Add artificial wait delay to prevent spamming
  await waitDelay(2000)

  const fields = result.data
  const existingAccount = await prisma.account.findUnique({
    where: { username: fields.username },
  })

  if (!existingAccount) {
    return NextResponse.json({
        message: 'User does not exist',
      },
      { status: 400 })
  }

  const isPasswordValid = await comparePasswordAsync(fields.password, existingAccount.passwordHash)
  if (!isPasswordValid) {
    return NextResponse.json({
        message: 'Password is invalid',
      },
      { status: 400 })
  }

  // Create a JWT token for authentication
  const privateKey = process.env.JWT_SECRET!
  const token = await signAsync({
    id: existingAccount.id,
    username: existingAccount.username,
  }, privateKey, JWT_EXPIRATION_SECONDS)

  // Set cookie with expiration
  cookies().set('token', token, {
    expires: Date.now() + JWT_EXPIRATION_SECONDS * 1000,
  })

  return NextResponse.json({
    message: 'Login Successful! Welcome to MiggleQuest',
    data: { token },
  })
}