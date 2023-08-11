import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'


export async function POST(request: Request) {
  cookies().delete('token')
  return NextResponse.json({
    message: 'You have logged out',
  })
}