import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";
import { SITE_URL } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data } = await supabase.from("Relogio").select("slug, atualizadoEm").eq("status", "DISPONIVEL");
  const relogios = data ?? [];

  const paginasEstaticas: MetadataRoute.Sitemap = [
    "/",
    "/catalogo",
    "/catalogo/pronta-entrega",
    "/catalogo/femininos",
    "/catalogo/acessorios",
    "/catalogo/sobre",
    "/catalogo/depoimentos",
    "/catalogo/verificacao",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const paginasRelogios: MetadataRoute.Sitemap = relogios.map((relogio) => ({
    url: `${SITE_URL}/catalogo/relogio/${relogio.slug}`,
    lastModified: relogio.atualizadoEm,
  }));

  return [...paginasEstaticas, ...paginasRelogios];
}
