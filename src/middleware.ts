import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// logic part
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublic =
    path === "/login" ||
    path === "/signup" ||
    path === "/verifyemail" ||
    path === "/forgotpassword";
  const token = request.cookies.get("token")?.value || "";

  if (isPublic && token) {
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }

  if (!isPublic && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// Matching part
export const config = {
  // either array or string
  matcher: [
    "/",
    "/profile",
    "/login",
    "/signup",
    "/profile/:path*",
    "/verifyemail",
    "/forgotpassword",
  ],
};
