export { default } from 'next-auth/middleware'

export const config = {
  matcher: [
    "/",
    "/users/:path",
    "/citas",
    "/citas/:path",
    "/clientes",
    "/clientes/:path",
    "/grabaciones",
    "/grabaciones/:path",
    "/usuarios",
    "/usuarios/:path",
  ]
}