import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { supabase } from "@/lib/supabase";
import { removerFoto } from "@/lib/storage";
import { relogioSchema } from "@/lib/validations/relogio.schema";
import { gerarSlugBase, gerarSlugUnico } from "@/lib/slug";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data, error } = await supabase
    .from("Relogio")
    .select("*, FotoRelogio(*)")
    .eq("id", id)
    .order("ordem", { referencedTable: "FotoRelogio" })
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Não encontrado" }, { status: 404 });

  const { FotoRelogio: fotos, ...relogio } = data;
  return NextResponse.json({ ...relogio, fotos });
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const parsed = relogioSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  const base = data.slug ? gerarSlugBase(data.slug) : gerarSlugBase(data.marca, data.modelo, data.referencia);
  const slug = await gerarSlugUnico(base, async (s) => {
    const { data: existente } = await supabase.from("Relogio").select("id").eq("slug", s).maybeSingle();
    return !!existente && existente.id !== id;
  });

  const { data: relogio, error } = await supabase
    .from("Relogio")
    .update({
      slug,
      marca: data.marca,
      modelo: data.modelo,
      referencia: data.referencia,
      preco: data.preco,
      condicao: data.condicao,
      diametroCaixa: data.diametroCaixa,
      movimento: data.movimento,
      pulseira: data.pulseira,
      vidro: data.vidro,
      materialCaixa: data.materialCaixa,
      anoEstado: data.anoEstado,
      feminino: data.feminino,
      destaque: data.destaque,
      status: data.status,
      atualizadoEm: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { error: deleteFotosError } = await supabase.from("FotoRelogio").delete().eq("relogioId", id);
  if (deleteFotosError) return NextResponse.json({ error: deleteFotosError.message }, { status: 500 });

  let fotos: { id: string; url: string; ordem: number; relogioId: string }[] = [];
  if (data.fotos.length > 0) {
    const { data: fotosInseridas, error: fotosError } = await supabase
      .from("FotoRelogio")
      .insert(data.fotos.map((f) => ({ id: randomUUID(), url: f.url, ordem: f.ordem, relogioId: id })))
      .select();

    if (fotosError) return NextResponse.json({ error: fotosError.message }, { status: 500 });
    fotos = fotosInseridas;
  }

  return NextResponse.json({ ...relogio, fotos });
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: relogio, error: fetchError } = await supabase
    .from("Relogio")
    .select("*, FotoRelogio(*)")
    .eq("id", id)
    .maybeSingle();

  if (fetchError) return NextResponse.json({ error: fetchError.message }, { status: 500 });
  if (!relogio) return NextResponse.json({ error: "Não encontrado" }, { status: 404 });

  await Promise.all(relogio.FotoRelogio.map((f) => removerFoto(f.url).catch(() => undefined)));

  const { error } = await supabase.from("Relogio").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
