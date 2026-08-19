import { NextRequest, NextResponse } from "next/server";
import { signSession, COOKIE_NAME, SESSION_DURATION_SECONDS } from "@/lib/auth";
import { verificarSenha } from "@/lib/senha";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const { usuario, senha } = await request.json();

  if (typeof usuario !== "string" || typeof senha !== "string") {
    return NextResponse.json({ error: "Usuário ou senha inválidos" }, { status: 401 });
  }

  const { data: registro } = await supabase.from("Usuario").select("*").eq("usuario", usuario).maybeSingle();

  if (!registro || !(await verificarSenha(senha, registro.senhaHash))) {
    return NextResponse.json({ error: "Usuário ou senha inválidos" }, { status: 401 });
  }

  const token = await signSession({ id: registro.id, usuario: registro.usuario, papel: registro.papel });
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
