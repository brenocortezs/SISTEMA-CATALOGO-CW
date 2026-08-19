import { supabase } from "@/lib/supabase";
import { CarrosselDepoimentos } from "@/components/catalogo/CarrosselDepoimentos";
import { Breadcrumb } from "@/components/catalogo/Breadcrumb";

export const metadata = {
  title: "Depoimentos — Concept Watch",
  description: "Veja prints de conversas reais de clientes satisfeitos com a Concept Watch.",
};
export const dynamic = "force-dynamic";

export default async function DepoimentosPage() {
  const { data } = await supabase
    .from("Depoimento")
    .select("*")
    .not("imagem", "is", null)
    .order("criadoEm", { ascending: false });

  const depoimentos = data ?? [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <Breadcrumb items={[{ label: "Catálogo", href: "/catalogo" }, { label: "Depoimentos" }]} />

      <h1 className="mt-4 font-serif text-2xl tracking-[0.04em]">Depoimentos</h1>
      <p className="mt-2 text-xs uppercase tracking-[0.06em] text-muted">
        O que nossos clientes dizem sobre a Concept Watch.
      </p>

      <div className="mt-8">
        {depoimentos.length === 0 ? (
          <p className="text-muted">Em breve, novos depoimentos.</p>
        ) : (
          <CarrosselDepoimentos depoimentos={depoimentos} />
        )}
      </div>
    </div>
  );
}
