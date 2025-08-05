import { NextResponse } from 'next/server'

export function middleware(request) {
  const url = request.nextUrl.clone()
  
  // Provera za domen
  if (request.headers.get('host') === 'melektron.com') {
    url.pathname = '/domen-fix'
    return NextResponse.rewrite(url)
  }
  
  return NextResponse.next()
}