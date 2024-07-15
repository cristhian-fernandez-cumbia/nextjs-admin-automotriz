export { default } from 'next-auth/middleware'

export const config = {
  matcher: [
    "/",
    "/mesas",
    "/atencion/:path*",
  ]
}