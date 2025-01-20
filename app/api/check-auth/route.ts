import { kv } from '@vercel/kv'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const sessionId = cookies().get('session')?.value
  if (!sessionId) {
    return NextResponse.json({ authenticated: false })
  }
  const session = await kv.get(`session:${sessionId}`)
  return NextResponse.json({ authenticated: !!session })
}