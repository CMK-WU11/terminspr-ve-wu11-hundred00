import { NextResponse } from "next/server"

export function middleware(request) {
    if (!request.cookies.has("landrupdans_token") || !request.cookies.has("landrupdans_uid")) {
        return NextResponse.redirect(new URL("/login", request.url))
    }
}

export const config = {
    matcher: "/kalender/:path*"
}