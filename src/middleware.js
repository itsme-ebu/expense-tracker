import { NextResponse } from "next/server";
export function middleware(request) {
  const cookie = request.cookies.get("token");
  const pathname = request.nextUrl.pathname;
  const public_routes = pathname === "/login" || pathname === "/signup";

  if (cookie && public_routes) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!cookie && !public_routes) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/profile", "/login", "/signup"],
};
