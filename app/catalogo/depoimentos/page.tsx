import { supabase } from "@/lib/supabase";
import { CarrosselDepoimentos } from "@/components/catalogo/CarrosselDepoimentos";
import { PageHeader } from "@/components/catalogo/PageHeader";

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
    <div>
      <PageHeader
        eyebrow="Clientes"
        titulo="Depoimentos"
        subtitulo="O que nossos clientes dizem sobre a Concept Watch."
        breadcrumb={[{ label: "Catálogo", href: "/catalogo" }, { label: "Depoimentos" }]}
      />

      <div className="mx-auto max-w-6xl px-4 py-14">
        {depoimentos.length === 0 ? (
          <p className="text-muted">Em breve, novos depoimentos.</p>
        ) : (
          <CarrosselDepoimentos depoimentos={depoimentos} />
        )}
      </div>
    </div>
  );
}
