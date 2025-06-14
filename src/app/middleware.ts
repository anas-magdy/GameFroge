import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  async function (request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const isAuth = await getToken({ req: request });
    const protectedRoutes = ["/profile"];
    const isAuthRoute = pathname.startsWith("/auth");
    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );
    if (isProtectedRoute && !isAuth) {
      // not authenticated
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    if (isAuthRoute && isAuth) {
      // authenticated user trying to access auth routes
      return NextResponse.redirect(new URL("/profile", request.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/profile/:path*", "/auth/:path*"],
};
