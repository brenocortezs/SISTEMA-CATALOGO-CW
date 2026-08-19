import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { supabase } from "@/lib/supabase";
import { acessorioSchema } from "@/lib/validations/acessorio.schema";
import { gerarSlugBase, gerarSlugUnico } from "@/lib/slug";

export async function GET() {
  const { data, error } = await supabase
    .from("Acessorio")
    .select("*, FotoAcessorio(*)")
    .order("criadoEm", { ascending: false })
    .order("ordem", { referencedTable: "FotoAcessorio" });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const acessorios = data.map(({ FotoAcessorio: fotos, ...acessorio }) => ({ ...acessorio, fotos }));
  return NextResponse.json(acessorios);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = acessorioSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  const base = data.slug ? gerarSlugBase(data.slug) : gerarSlugBase(data.nome);
  const slug = await gerarSlugUnico(base, async (s) => {
    const { data: existente } = await supabase.from("Acessorio").select("id").eq("slug", s).maybeSingle();
    return !!existente;
  });

  const { data: acessorio, error } = await supabase
    .from("Acessorio")
    .insert({
      id: randomUUID(),
      slug,
      tipo: data.tipo,
      nome: data.nome,
      descricao: data.descricao || null,
      preco: data.preco,
      status: data.status,
      atualizadoEm: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  let fotos: { id: string; url: string; ordem: number; acessorioId: string }[] = [];
  if (data.fotos.length > 0) {
    const { data: fotosInseridas, error: fotosError } = await supabase
      .from("FotoAcessorio")
      .insert(data.fotos.map((f) => ({ id: randomUUID(), url: f.url, ordem: f.ordem, acessorioId: acessorio.id })))
      .select();

    if (fotosError) return NextResponse.json({ error: fotosError.message }, { status: 500 });
    fotos = fotosInseridas;
  }

  return NextResponse.json({ ...acessorio, fotos }, { status: 201 });
}
