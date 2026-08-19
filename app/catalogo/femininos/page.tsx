import { CardRelogio } from "@/components/catalogo/CardRelogio";
import { FiltrosCatalogo } from "@/components/catalogo/FiltrosCatalogo";
import { PageHeader } from "@/components/catalogo/PageHeader";
import { NaoEncontrouCTA } from "@/components/catalogo/NaoEncontrouCTA";
import { listarRelogiosDisponiveis, listarMarcasDisponiveis } from "@/lib/queries";

export const metadata = {
  title: "Femininos — Concept Watch",
  description: "Relógios femininos de luxo verificados, com procedência garantida.",
};

export default async function FemininosPage({
  searchParams,
}: {
  searchParams: Promise<{
    marca?: string;
    precoMin?: string;
    precoMax?: string;
    condicao?: string;
    busca?: string;
    ordenar?: string;
  }>;
}) {
  const params = await searchParams;
  const [relogios, marcas] = await Promise.all([
    listarRelogiosDisponiveis({ feminino: true, ...params }),
    listarMarcasDisponiveis(true),
  ]);

  return (
    <div>
      <PageHeader
        eyebrow="Catálogo"
        titulo="Femininos"
        subtitulo="Nossa seleção de relógios femininos verificados."
        breadcrumb={[{ label: "Catálogo", href: "/catalogo" }, { label: "Femininos" }]}
      />

      <div className="mx-auto max-w-6xl px-4 py-10">
        <FiltrosCatalogo marcas={marcas} />

        <p className="mt-4 text-xs text-muted">
          {relogios.length} {relogios.length === 1 ? "relógio disponível" : "relógios disponíveis"}
        </p>

        {relogios.length === 0 ? (
          <div className="mt-8">
            <p className="text-muted">Nenhum relógio encontrado com esses filtros.</p>
            <NaoEncontrouCTA />
          </div>
        ) : (
          <>
            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
              {relogios.map((relogio) => (
                <CardRelogio key={relogio.id} relogio={relogio} />
              ))}
            </div>
            <NaoEncontrouCTA />
          </>
        )}
      </div>
    </div>
  );
}
