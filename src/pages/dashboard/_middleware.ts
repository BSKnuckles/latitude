import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

/** @param {import("next/server").NextRequest} req */
export async function middleware(req) {
      const session = await getToken({
        req,
        secret: process.env.SECRET,
        secureCookie: process.env.NEXTAUTH_URL?.startsWith('https://') ?? !!process.env.VERCEL_URL
      })
      if (!session) return NextResponse.redirect(`/auth/login?callbackUrl=${req.nextUrl}`)
}
