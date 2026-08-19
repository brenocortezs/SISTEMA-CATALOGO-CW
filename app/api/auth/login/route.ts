import { NextRequest, NextResponse } from "next/server";
import { signSession, validarCredenciais, COOKIE_NAME, SESSION_DURATION_SECONDS } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const { usuario, senha } = await request.json();

  if (typeof usuario !== "string" || typeof senha !== "string" || !validarCredenciais(usuario, senha)) {
    return NextResponse.json({ error: "Usuário ou senha inválidos" }, { status: 401 });
  }

  const token = await signSession(usuario);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_SECONDS,
  });
  return response;
}
