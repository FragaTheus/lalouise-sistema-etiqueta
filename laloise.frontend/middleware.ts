import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  let payload;
  try {
    const { payload: decoded } = await jwtVerify(token, SECRET);
    payload = decoded;
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const roles = payload.roles as string[];

  if (roles.includes("ROLE_ADMIN")) {
    return NextResponse.next();
  }

  if (pathname !== "/painel/etiquetas/imprimir") {
    return NextResponse.redirect(new URL("/nao-autorizado", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!login|auth|api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};