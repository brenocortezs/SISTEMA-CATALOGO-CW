import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getSessaoAtual } from "@/lib/sessao";

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const sessao = await getSessaoAtual();
  if (sessao?.papel !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Acesso restrito" }, { status: 403 });
  }

  const { id } = await params;

  const { data: alvo, error: fetchError } = await supabase
    .from("Usuario")
    .select("id, papel")
    .eq("id", id)
    .maybeSingle();

  if (fetchError) return NextResponse.json({ error: fetchError.message }, { status: 500 });
  if (!alvo) return NextResponse.json({ error: "Não encontrado" }, { status: 404 });

  if (alvo.papel === "SUPER_ADMIN") {
    return NextResponse.json({ error: "O Admin Máximo não pode ser removido" }, { status: 403 });
  }

  const { error } = await supabase.from("Usuario").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
