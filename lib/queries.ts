import { cache } from "react";
import { supabase } from "@/lib/supabase";
import type { Condicao, Relogio } from "@/lib/types";

const SELECT_RELOGIO_COM_FOTOS = "*, FotoRelogio(*)" as const;

function comFotos<T extends { FotoRelogio: unknown }>(row: T) {
  const { FotoRelogio: fotos, ...relogio } = row;
  return { ...relogio, fotos } as Omit<T, "FotoRelogio"> & { fotos: T["FotoRelogio"] };
}

export const buscarRelogioPorSlug = cache(async (slug: string) => {
  const { data, error } = await supabase
    .from("Relogio")
    .select(SELECT_RELOGIO_COM_FOTOS)
    .eq("slug", slug)
    .order("ordem", { referencedTable: "FotoRelogio" })
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;
  return comFotos(data);
});

export type FiltrosRelogio = {
  feminino: boolean;
  marca?: string;
  precoMin?: string;
  precoMax?: string;
  condicao?: string;
  busca?: string;
  ordenar?: string;
};

function ordenacao(ordenar?: string): { coluna: "preco" | "criadoEm"; ascending: boolean } {
  if (ordenar === "menor-preco") return { coluna: "preco", ascending: true };
  if (ordenar === "maior-preco") return { coluna: "preco", ascending: false };
  return { coluna: "criadoEm", ascending: false };
}

export async function listarRelogiosDisponiveis(filtros: FiltrosRelogio) {
  let query = supabase
    .from("Relogio")
    .select(SELECT_RELOGIO_COM_FOTOS)
    .eq("status", "DISPONIVEL")
    .eq("feminino", filtros.feminino);

  if (filtros.marca) query = query.eq("marca", filtros.marca);
  if (filtros.condicao) query = query.eq("condicao", filtros.condicao as Condicao);
  if (filtros.precoMin) query = query.gte("preco", Number(filtros.precoMin));
  if (filtros.precoMax) query = query.lte("preco", Number(filtros.precoMax));

  const termoBusca = filtros.busca?.replace(/[,()%]/g, "").trim();
  if (termoBusca) {
    query = query.or(
      `marca.ilike.%${termoBusca}%,modelo.ilike.%${termoBusca}%,referencia.ilike.%${termoBusca}%`
    );
  }

  const { coluna, ascending } = ordenacao(filtros.ordenar);
  const { data, error } = await query
    .order("ordem", { referencedTable: "FotoRelogio" })
    .order(coluna, { ascending });

  if (error) throw error;
  return data.map(comFotos);
}

export async function listarMarcasDisponiveis(feminino: boolean) {
  const { data, error } = await supabase
    .from("Relogio")
    .select("marca")
    .eq("status", "DISPONIVEL")
    .eq("feminino", feminino);

  if (error) throw error;
  return Array.from(new Set(data.map((r) => r.marca))).sort();
}

export async function listarRelogiosSimilares(relogio: Relogio, limite = 4) {
  const precoMin = relogio.preco * 0.7;
  const precoMax = relogio.preco * 1.3;

  const { data, error } = await supabase
    .from("Relogio")
    .select(SELECT_RELOGIO_COM_FOTOS)
    .neq("id", relogio.id)
    .eq("status", "DISPONIVEL")
    .or(`marca.eq.${relogio.marca},and(preco.gte.${precoMin},preco.lte.${precoMax})`)
    .order("ordem", { referencedTable: "FotoRelogio" })
    .order("criadoEm", { ascending: false })
    .limit(limite);

  if (error) throw error;
  return data.map(comFotos);
}
