import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { supabase } from "@/lib/supabase";
import { hashSenha } from "@/lib/senha";
import { usuarioSchema } from "@/lib/validations/usuario.schema";
import { getSessaoAtual } from "@/lib/sessao";

export async function GET() {
  const sessao = await getSessaoAtual();
  if (sessao?.papel !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Acesso restrito" }, { status: 403 });
  }

  const { data, error } = await supabase
    .from("Usuario")
    .select("id, usuario, papel, criadoEm")
    .order("criadoEm", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const sessao = await getSessaoAtual();
  if (sessao?.papel !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Acesso restrito" }, { status: 403 });
  }

  const body = await request.json();
  const parsed = usuarioSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { data: existente } = await supabase
    .from("Usuario")
    .select("id")
    .eq("usuario", parsed.data.usuario)
    .maybeSingle();

  if (existente) {
    return NextResponse.json({ error: "Já existe um usuário com esse nome" }, { status: 409 });
  }

  const senhaHash = await hashSenha(parsed.data.senha);

  const { data: usuario, error } = await supabase
    .from("Usuario")
    .insert({
      id: randomUUID(),
      usuario: parsed.data.usuario,
      senhaHash,
      papel: "ADMIN",
      atualizadoEm: new Date().toISOString(),
    })
    .select("id, usuario, papel, criadoEm")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(usuario, { status: 201 });
}
