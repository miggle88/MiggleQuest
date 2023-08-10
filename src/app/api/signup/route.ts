import { NextResponse } from 'next/server'
import { prisma } from '@/db'
import { SignupRequest } from '@/types'
import { next } from 'sucrase/dist/types/parser/tokenizer'
import { hashPasswordAsync } from '@/bcrypt'

export async function POST(request: Request) {
  const body = await request.json()
  const fields = body as SignupRequest

  // Validate that username is not null or empty
  if (!fields.username?.trim()) {
    return NextResponse.json({
        error: 'Invalid user name',
      },
      { status: 400 })
  }
  // Validate that display name is not null or empty
  if (!fields.displayName?.trim()) {
    return NextResponse.json({
        error: 'Invalid display name',
      },
      { status: 400 })
  }
  // Validate that email address is not null or empty
  if (!fields.emailAddress?.trim()) {
    return NextResponse.json({
        error: 'Invalid email address',
      },
      { status: 400 })
  }
  // Validate that password is not null or empty
  if (!fields.password?.trim()) {
    return NextResponse.json({
        error: 'Invalid password',
      },
      { status: 400 })
  }
  // Validate that the password is at least characters long
  if (fields.password.length < 8) {
    return NextResponse.json({
        error: 'Password must be at least 8 characters long',
      },
      { status: 400 })
  }

  const trimmedUsername = fields.username.trim()
  const existingAccount = await prisma.account.findUnique({
    where: { username: trimmedUsername },
  })

  if (existingAccount) {
    return NextResponse.json({
        error: 'User name is already in use',
      },
      { status: 400 })

  }

  const passwordHash = await hashPasswordAsync(fields.password)

  const newAccount = await prisma.account.create({
    data: {
      username: trimmedUsername,
      displayName: fields.displayName.trim(),
      emailAddress: fields.emailAddress.trim(),
      passwordHash,
    },
  })

  return NextResponse.json({ message: 'account created', data: newAccount })
}
