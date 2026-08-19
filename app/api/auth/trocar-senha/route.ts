import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { hashSenha, verificarSenha } from "@/lib/senha";
import { trocarSenhaSchema } from "@/lib/validations/usuario.schema";
import { getSessaoAtual } from "@/lib/sessao";

export async function POST(request: NextRequest) {
  const sessao = await getSessaoAtual();
  if (!sessao) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = trocarSenhaSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { data: registro, error: fetchError } = await supabase
    .from("Usuario")
    .select("id, senhaHash")
    .eq("id", sessao.id)
    .maybeSingle();

  if (fetchError) return NextResponse.json({ error: fetchError.message }, { status: 500 });
  if (!registro || !(await verificarSenha(parsed.data.senhaAtual, registro.senhaHash))) {
    return NextResponse.json({ error: "Senha atual incorreta" }, { status: 401 });
  }

  const novaSenhaHash = await hashSenha(parsed.data.novaSenha);
  const { error } = await supabase
    .from("Usuario")
    .update({ senhaHash: novaSenhaHash, atualizadoEm: new Date().toISOString() })
    .eq("id", sessao.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
