import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { removerFoto } from "@/lib/storage";
import { depoimentoSchema } from "@/lib/validations/depoimento.schema";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data, error } = await supabase.from("Depoimento").select("*").eq("id", id).maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Não encontrado" }, { status: 404 });
  return NextResponse.json(data);
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const parsed = depoimentoSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { data: depoimento, error } = await supabase
    .from("Depoimento")
    .update(parsed.data)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(depoimento);
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: depoimento, error: fetchError } = await supabase
    .from("Depoimento")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (fetchError) return NextResponse.json({ error: fetchError.message }, { status: 500 });
  if (!depoimento) return NextResponse.json({ error: "Não encontrado" }, { status: 404 });

  if (depoimento.imagem) await removerFoto(depoimento.imagem).catch(() => undefined);

  const { error } = await supabase.from("Depoimento").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
