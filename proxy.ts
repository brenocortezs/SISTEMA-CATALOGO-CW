import { NextRequest, NextResponse } from "next/server";
import { verifySession, COOKIE_NAME } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login" || pathname === "/api/auth/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  const session = token ? await verifySession(token) : null;

  if (!session) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  const rotaRestritaAoAdminMaximo =
    pathname.startsWith("/admin/usuarios") || pathname.startsWith("/api/usuarios");

  if (rotaRestritaAoAdminMaximo && session.papel !== "SUPER_ADMIN") {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Acesso restrito" }, { status: 403 });
    }
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/relogios/:path*",
    "/api/acessorios/:path*",
    "/api/depoimentos/:path*",
    "/api/upload/:path*",
    "/api/usuarios/:path*",
    "/api/auth/trocar-senha",
  ],
};
