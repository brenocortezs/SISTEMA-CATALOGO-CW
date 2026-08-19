import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { CardRelogio } from "@/components/catalogo/CardRelogio";
import { MarcasMarquee } from "@/components/catalogo/MarcasMarquee";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Concept Watch — Relógios de Luxo Verificados",
  description:
    "Compra e venda de relógios de luxo verificados, com estoque próprio. Tag Heuer, Bvlgari, Omega, Breitling, Rolex, Cartier e Hublot.",
};

export default async function CatalogoHomePage() {
  const { data } = await supabase
    .from("Relogio")
    .select("*, FotoRelogio(*)")
    .eq("status", "DISPONIVEL")
    .eq("destaque", true)
    .order("criadoEm", { ascending: false })
    .order("ordem", { referencedTable: "FotoRelogio" })
    .limit(8);

  const destaques = (data ?? []).map(({ FotoRelogio: fotos, ...relogio }) => ({ ...relogio, fotos }));

  return (
    <div>
      <section className="flex flex-col items-center gap-6 px-4 py-20 text-center">
        <h1 className="font-serif text-4xl leading-tight tracking-[0.08em] uppercase sm:text-6xl">
          Concept
          <br />
          Watch
        </h1>
        <p className="max-w-xl text-xs uppercase tracking-[0.08em] text-muted">
          Compra e venda de relógios de luxo verificados, com estoque próprio.
          No mercado há 3 anos, atendimento direto via WhatsApp.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link
            href="/catalogo/pronta-entrega"
            className="border border-ink px-6 py-3 text-xs font-medium uppercase tracking-[0.1em] text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            Ver Pronta Entrega
          </Link>
          <Link
            href="/catalogo/femininos"
            className="border border-ink px-6 py-3 text-xs font-medium uppercase tracking-[0.1em] text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            Ver Femininos
          </Link>
          <Link
            href="/catalogo/acessorios"
            className="border border-ink px-6 py-3 text-xs font-medium uppercase tracking-[0.1em] text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            Ver Acessórios
          </Link>
        </div>
      </section>

      <MarcasMarquee />

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
