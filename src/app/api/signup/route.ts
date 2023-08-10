import { NextResponse } from 'next/server'
import { prisma } from '@/db'
import { hashPasswordAsync } from '@/helpers/bcrypt'
import { z } from 'zod'
import validateRequest from '@/middlewares/validate-request'
import { formatZodError } from '@/helpers/zod-errors'
import { SignupRequest } from '@/types'

const USERNAME_REGEX = /^[0-9a-z]+$/i

const bodySchema = z.object({
  username: z.string()
    .regex(USERNAME_REGEX, 'Username can only contain alphanumeric characters')
    .min(4)
    .max(20)
    .trim()
    .toLowerCase(),

  displayName: z.string()
    .min(4)
    .max(20)
    .trim(),

  emailAddress: z.string()
    .email()
    .max(100)
    .trim(),

  password: z.string()
    .min(8)
    .max(20),

})

export async function POST(request: Request) {
  // Validate the body schema, throw 400 error if it's not valid
  const result = await validateRequest<SignupRequest>(request, bodySchema)
  if (!result.success) {
    const validationMessage = formatZodError(result.error)
    return NextResponse.json({
        message: validationMessage,
        errors: result.error.errors,
      },
      { status: 400 })
  }

  const fields = result.data

  const existingAccount = await prisma.account.findUnique({
    where: { username: fields.username },
  })

  if (existingAccount) {
    return NextResponse.json({
        message: 'User name is already in use',
      },
      { status: 400 })
  }

  // Calculate the bcrypt hash of the password to store
  const hash = await hashPasswordAsync(fields.password)

  const newAccount = await prisma.account.create({
    data: {
      username: fields.username,
      displayName: fields.displayName,
      emailAddress: fields.emailAddress,
      passwordHash: hash,
    },
  })

  // Pull the password hash out, so we don't return it in the JSON
  const { passwordHash, ...accountWithoutHash } = newAccount

  return NextResponse.json({
    message: 'account created',
    data: accountWithoutHash,
  })
}
