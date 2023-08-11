import { prisma } from '@/db'
import authToken from '@/middlewares/auth-token'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const result = await authToken(request)
  if (!result.success) {
    return NextResponse.json({
      message: 'You are not logged in',
    }, { status: 401 })
  }

  const user = result.user
  const heroes = await prisma.hero.findMany({
    where: { accountId: user.id },
    orderBy: { id: 'asc' },
  })

  return NextResponse.json({
    message: `Found ${heroes.length} heroes`,
    data: heroes,
  })
}


