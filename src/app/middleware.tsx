import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
// import { decrypt } from "./lib/auth/jwt";
// import { NextURL } from "next/dist/server/web/next-url";

const PUBLIC_PATHS = ["/", "login", "register"];

export async function middleware(request: NextRequest) {
  const token = getToken({ req: request });

  const isPublic = PUBLIC_PATHS.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isPublic) {
    return NextResponse.next(); // Allow access
  }

  // if not authenticated and not a public route
  if (!token) {
    const loginURL = new URL("/pages/login", request.url);
    return NextResponse.redirect(loginURL);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
