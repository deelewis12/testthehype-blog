import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const MOBILE_REGEX = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const ua = req.headers.get("user-agent") ?? "";

  // Redirect mobile users to the mobile page
  if (MOBILE_REGEX.test(ua) && pathname !== "/mobile") {
    return NextResponse.redirect(new URL("/mobile", req.url));
  }

  // Protect admin routes
  const isLoggedIn = !!req.auth;
  if (pathname.startsWith("/admin") && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
});

export const config = {
  matcher: ["/", "/blog/:path*", "/admin/:path*"],
};
