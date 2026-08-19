import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { CardRelogio } from "@/components/catalogo/CardRelogio";
import { MarcasMarquee } from "@/components/catalogo/MarcasMarquee";
import { StatsBand } from "@/components/catalogo/StatsBand";
import { Diferenciais } from "@/components/catalogo/Diferenciais";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Concept Watch — Relógios de Luxo Verificados",
  description:
    "Compra e venda de relógios de luxo verificados, com estoque próprio. Tag Heuer, Bvlgari, Omega, Breitling, Rolex, Cartier e Hublot.",
};

export default async function CatalogoHomePage() {
  const [{ data: destaquesData }, { data: disponiveis }] = await Promise.all([
    supabase
      .from("Relogio")
      .select("*, FotoRelogio(*)")
      .eq("status", "DISPONIVEL")
      .eq("destaque", true)
      .order("criadoEm", { ascending: false })
      .order("ordem", { referencedTable: "FotoRelogio" })
      .limit(8),
    supabase.from("Relogio").select("marca").eq("status", "DISPONIVEL"),
  ]);

  const destaques = (destaquesData ?? []).map(({ FotoRelogio: fotos, ...relogio }) => ({ ...relogio, fotos }));
  const totalRelogios = disponiveis?.length ?? 0;
  const totalMarcas = new Set((disponiveis ?? []).map((r) => r.marca)).size;

  return (
    <div>
      <section className="relative flex flex-col items-center gap-6 overflow-hidden bg-ink-bg px-4 py-24 text-center">
        <Image
          src="/logo-icon-white.png"
          alt=""
          aria-hidden
          width={900}
          height={999}
          className="pointer-events-none absolute left-1/2 top-1/2 w-[140vw] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.05] sm:w-[720px]"
        />

        <div className="relative flex flex-col items-center gap-6">
          <h1 className="font-serif text-4xl leading-tight tracking-[0.08em] text-ink-text uppercase sm:text-6xl">
            Concept
            <br />
            Watch
          </h1>
          <p className="max-w-xl text-xs uppercase tracking-[0.08em] text-ink-muted">
            Compra e venda de relógios de luxo verificados, com estoque próprio.
            No mercado há 3 anos, atendimento direto via WhatsApp.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              href="/catalogo/pronta-entrega"
              className="border border-ink-text px-6 py-3 text-xs font-medium uppercase tracking-[0.1em] text-ink-text transition-colors hover:bg-ink-text hover:text-ink-bg"
            >
              Ver Pronta Entrega
            </Link>
            <Link
              href="/catalogo/femininos"
              className="border border-ink-text px-6 py-3 text-xs font-medium uppercase tracking-[0.1em] text-ink-text transition-colors hover:bg-ink-text hover:text-ink-bg"
            >
              Ver Femininos
            </Link>
            <Link
              href="/catalogo/acessorios"
              className="border border-ink-text px-6 py-3 text-xs font-medium uppercase tracking-[0.1em] text-ink-text transition-colors hover:bg-ink-text hover:text-ink-bg"
            >
              Ver Acessórios
            </Link>
          </div>
        </div>
      </section>

      <MarcasMarquee />

      <StatsBand totalRelogios={totalRelogios} totalMarcas={totalMarcas} />

      <Diferenciais />

      {destaques.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-xs uppercase tracking-[0.12em] text-muted">Destaques</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {destaques.map((relogio) => (
              <CardRelogio key={relogio.id} relogio={relogio} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
