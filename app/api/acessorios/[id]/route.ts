import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { supabase } from "@/lib/supabase";
import { removerFoto } from "@/lib/storage";
import { acessorioSchema } from "@/lib/validations/acessorio.schema";
import { gerarSlugBase, gerarSlugUnico } from "@/lib/slug";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data, error } = await supabase
    .from("Acessorio")
    .select("*, FotoAcessorio(*)")
    .eq("id", id)
    .order("ordem", { referencedTable: "FotoAcessorio" })
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Não encontrado" }, { status: 404 });

  const { FotoAcessorio: fotos, ...acessorio } = data;
  return NextResponse.json({ ...acessorio, fotos });
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const parsed = acessorioSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  const base = data.slug ? gerarSlugBase(data.slug) : gerarSlugBase(data.nome);
  const slug = await gerarSlugUnico(base, async (s) => {
    const { data: existente } = await supabase.from("Acessorio").select("id").eq("slug", s).maybeSingle();
    return !!existente && existente.id !== id;
  });

  const { data: acessorio, error } = await supabase
    .from("Acessorio")
    .update({
      slug,
      tipo: data.tipo,
      nome: data.nome,
      descricao: data.descricao || null,
      preco: data.preco,
      status: data.status,
      atualizadoEm: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { error: deleteFotosError } = await supabase.from("FotoAcessorio").delete().eq("acessorioId", id);
  if (deleteFotosError) return NextResponse.json({ error: deleteFotosError.message }, { status: 500 });

  let fotos: { id: string; url: string; ordem: number; acessorioId: string }[] = [];
  if (data.fotos.length > 0) {
    const { data: fotosInseridas, error: fotosError } = await supabase
      .from("FotoAcessorio")
      .insert(data.fotos.map((f) => ({ id: randomUUID(), url: f.url, ordem: f.ordem, acessorioId: id })))
      .select();

    if (fotosError) return NextResponse.json({ error: fotosError.message }, { status: 500 });
    fotos = fotosInseridas;
  }

  return NextResponse.json({ ...acessorio, fotos });
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: acessorio, error: fetchError } = await supabase
    .from("Acessorio")
    .select("*, FotoAcessorio(*)")
    .eq("id", id)
    .maybeSingle();

  if (fetchError) return NextResponse.json({ error: fetchError.message }, { status: 500 });
  if (!acessorio) return NextResponse.json({ error: "Não encontrado" }, { status: 404 });

  await Promise.all(acessorio.FotoAcessorio.map((f) => removerFoto(f.url).catch(() => undefined)));

  const { error } = await supabase.from("Acessorio").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
