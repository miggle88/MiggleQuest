import { NextResponse } from 'next/server'
import { prisma } from '@/db'
import authToken from '@/middlewares/auth-token'

export async function GET(request: Request) {
  const result = await authToken(request)
  if (!result.success) {
    return NextResponse.json({
      message: 'You are not logged in',
    }, { status: 401 })
  }

  const user = result.user
  const account = await prisma.account.findUnique({
    where: { id: user.id },
  })

  // Pull the password hash out, so we don't return it in the JSON
  // @ts-ignore
  const { passwordHash, ...accountWithoutHash } = account


  return NextResponse.json({
    message: `Welcome ${user.username} (id ${user.id})`,
    data: accountWithoutHash,
  })
}
