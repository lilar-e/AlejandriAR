import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { checkAuth } from './app/actions/auth'

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const isAuthenticated = await checkAuth()
    
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*'
}

