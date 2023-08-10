import { NextResponse } from 'next/server'
import authToken from '@/middlewares/auth-token'

export async function GET(request: Request) {
  const result = await authToken(request)
  if (!result.success) {
    return NextResponse.json({
      message: 'You are not logged in',
    }, { status: 401 })
  }

  const user = result.user

  return NextResponse.json({
    message: `Welcome ${user.username} (id ${user.id})`,
  })
}