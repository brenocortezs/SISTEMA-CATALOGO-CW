import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { supabase } from "@/lib/supabase";
import { relogioSchema } from "@/lib/validations/relogio.schema";
import { gerarSlugBase, gerarSlugUnico } from "@/lib/slug";

export async function GET() {
  const { data, error } = await supabase
    .from("Relogio")
    .select("*, FotoRelogio(*)")
    .order("criadoEm", { ascending: false })
    .order("ordem", { referencedTable: "FotoRelogio" });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const relogios = data.map(({ FotoRelogio: fotos, ...relogio }) => ({ ...relogio, fotos }));
  return NextResponse.json(relogios);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = relogioSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  const base = data.slug ? gerarSlugBase(data.slug) : gerarSlugBase(data.marca, data.modelo, data.referencia);
  const slug = await gerarSlugUnico(base, async (s) => {
    const { data: existente } = await supabase.from("Relogio").select("id").eq("slug", s).maybeSingle();
    return !!existente;
  });

  const { data: relogio, error } = await supabase
    .from("Relogio")
    .insert({
      id: randomUUID(),
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
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  let fotos: { id: string; url: string; ordem: number; relogioId: string }[] = [];
  if (data.fotos.length > 0) {
    const { data: fotosInseridas, error: fotosError } = await supabase
      .from("FotoRelogio")
      .insert(data.fotos.map((f) => ({ id: randomUUID(), url: f.url, ordem: f.ordem, relogioId: relogio.id })))
      .select();

    if (fotosError) return NextResponse.json({ error: fotosError.message }, { status: 500 });
    fotos = fotosInseridas;
  }

  return NextResponse.json({ ...relogio, fotos }, { status: 201 });
}
