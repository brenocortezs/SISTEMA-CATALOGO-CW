import "dotenv/config";
import { randomUUID } from "crypto";
import { supabase } from "../lib/supabase";
import { gerarSlugBase } from "../lib/slug";

async function upsertRelogio(input: {
  slug: string;
  marca: string;
  modelo: string;
  referencia: string;
  preco: number;
  condicao: "NOVO" | "SEMINOVO";
  diametroCaixa: string;
  movimento: string;
  pulseira: string;
  vidro: string;
  materialCaixa: string;
  anoEstado: string;
  feminino: boolean;
  destaque: boolean;
  fotos: { url: string; ordem: number }[];
}) {
  const { data: existente } = await supabase.from("Relogio").select("id").eq("slug", input.slug).maybeSingle();
  if (existente) return;

  const { data: relogio, error } = await supabase
    .from("Relogio")
    .insert({
      id: randomUUID(),
      slug: input.slug,
      marca: input.marca,
      modelo: input.modelo,
      referencia: input.referencia,
      preco: input.preco,
      condicao: input.condicao,
      diametroCaixa: input.diametroCaixa,
      movimento: input.movimento,
      pulseira: input.pulseira,
      vidro: input.vidro,
      materialCaixa: input.materialCaixa,
      anoEstado: input.anoEstado,
      feminino: input.feminino,
      destaque: input.destaque,
      status: "DISPONIVEL",
      atualizadoEm: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;

  await supabase
    .from("FotoRelogio")
    .insert(input.fotos.map((f) => ({ id: randomUUID(), url: f.url, ordem: f.ordem, relogioId: relogio.id })));
}

async function main() {
  await upsertRelogio({
    slug: gerarSlugBase("Tag Heuer", "Carrera Calibre 16", "CV2A1AB"),
    marca: "Tag Heuer",
    modelo: "Carrera Calibre 16",
    referencia: "CV2A1AB.FC6235",
    preco: 32500,
    condicao: "SEMINOVO",
    diametroCaixa: "43mm",
    movimento: "Automático, cronógrafo",
    pulseira: "Couro preto",
    vidro: "Safira",
    materialCaixa: "Aço inoxidável",
    anoEstado: "2021, excelente estado",
    feminino: false,
    destaque: true,
    fotos: [
      { url: "https://placehold.co/800x800/000000/FFFFFF.png?text=Tag+Heuer+1", ordem: 0 },
      { url: "https://placehold.co/800x800/000000/FFFFFF.png?text=Tag+Heuer+2", ordem: 1 },
    ],
  });

  await upsertRelogio({
    slug: gerarSlugBase("Bvlgari", "Serpenti", "SP35C6SDL"),
    marca: "Bvlgari",
    modelo: "Serpenti",
    referencia: "SP35C6SDL",
    preco: 48900,
    condicao: "NOVO",
    diametroCaixa: "35mm",
    movimento: "Quartzo",
    pulseira: "Aço inoxidável",
    vidro: "Safira",
    materialCaixa: "Aço inoxidável com cravação",
    anoEstado: "2024, lacrado",
    feminino: true,
    destaque: true,
    fotos: [
      { url: "https://placehold.co/800x800/000000/FFFFFF.png?text=Bvlgari+1", ordem: 0 },
      { url: "https://placehold.co/800x800/000000/FFFFFF.png?text=Bvlgari+2", ordem: 1 },
    ],
  });

  const acessorioSlug = gerarSlugBase("Maleta Porta-relogios 6 Nichos");
  const { data: acessorioExistente } = await supabase
    .from("Acessorio")
    .select("id")
    .eq("slug", acessorioSlug)
    .maybeSingle();

  if (!acessorioExistente) {
    const { data: acessorio, error } = await supabase
      .from("Acessorio")
      .insert({
        id: randomUUID(),
        slug: acessorioSlug,
        tipo: "MALETA",
        nome: "Maleta Porta-relógios 6 Nichos",
        preco: 890,
        status: "DISPONIVEL",
        atualizadoEm: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    await supabase.from("FotoAcessorio").insert({
      id: randomUUID(),
      url: "https://placehold.co/800x800/000000/FFFFFF.png?text=Maleta",
      ordem: 0,
      acessorioId: acessorio.id,
    });
  }

  const { data: depoimentoExistente } = await supabase
    .from("Depoimento")
    .select("id")
    .eq("imagem", "https://placehold.co/600x900/000000/FFFFFF.png?text=Print+WhatsApp")
    .maybeSingle();

  if (!depoimentoExistente) {
    await supabase.from("Depoimento").insert({
      id: randomUUID(),
      imagem: "https://placehold.co/600x900/000000/FFFFFF.png?text=Print+WhatsApp",
    });
  }

  console.log("Seed concluído.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
