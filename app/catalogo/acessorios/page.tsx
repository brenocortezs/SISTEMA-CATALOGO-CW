import { supabase } from "@/lib/supabase";
import { CardAcessorio } from "@/components/catalogo/CardAcessorio";
import { Breadcrumb } from "@/components/catalogo/Breadcrumb";

export const metadata = {
  title: "Acessórios — Concept Watch",
  description: "Porta-relógios, pulseiras e maletas para o cuidado da sua coleção.",
};
export const dynamic = "force-dynamic";

export default async function AcessoriosPage() {
  const { data } = await supabase
    .from("Acessorio")
    .select("*, FotoAcessorio(*)")
    .eq("status", "DISPONIVEL")
    .order("criadoEm", { ascending: false })
    .order("ordem", { referencedTable: "FotoAcessorio" });

  const acessorios = (data ?? []).map(({ FotoAcessorio: fotos, ...acessorio }) => ({ ...acessorio, fotos }));

  return (
    <div className="bg-ink-bg py-10">
      <div className="mx-auto max-w-6xl px-4">
        <Breadcrumb tone="dark" items={[{ label: "Catálogo", href: "/catalogo" }, { label: "Acessórios" }]} />

        <span className="mt-6 block text-[11px] uppercase tracking-[0.16em] text-ink-muted">Catálogo</span>
        <h1 className="mt-2 font-serif text-2xl tracking-[0.04em] text-ink-text">Acessórios</h1>
        <p className="mt-2 text-xs uppercase tracking-[0.06em] text-ink-muted">
          Porta-relógios, pulseiras e maletas.
        </p>

        <p className="mt-4 text-xs text-ink-muted">
          {acessorios.length} {acessorios.length === 1 ? "item disponível" : "itens disponíveis"}
        </p>

        {acessorios.length === 0 ? (
          <p className="mt-8 text-ink-muted">Nenhum acessório disponível no momento.</p>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
            {acessorios.map((acessorio) => (
              <CardAcessorio key={acessorio.id} acessorio={acessorio} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
