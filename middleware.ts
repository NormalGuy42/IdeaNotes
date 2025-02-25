export { auth as middleware } from "./src/auth"
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
    '/admin/:path*',
    '/user/:path*'
  ],
 }