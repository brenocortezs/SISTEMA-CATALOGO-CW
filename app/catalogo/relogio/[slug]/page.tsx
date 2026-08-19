import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GaleriaFotos } from "@/components/catalogo/GaleriaFotos";
import { FichaTecnica } from "@/components/catalogo/FichaTecnica";
import { Breadcrumb } from "@/components/catalogo/Breadcrumb";
import { RelogiosSimilares } from "@/components/catalogo/RelogiosSimilares";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { SeloAutenticidade } from "@/components/catalogo/SeloAutenticidade";
import { formatarPreco } from "@/lib/format";
import { TEXTO_PARCELAMENTO } from "@/lib/constants";
import { buscarRelogioPorSlug, listarRelogiosSimilares } from "@/lib/queries";
import { buscarHistoriaMarca } from "@/lib/marcaHistoria";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const relogio = await buscarRelogioPorSlug(slug);
  if (!relogio) return {};

  const titulo = `${relogio.marca} ${relogio.modelo} — Concept Watch`;
  const descricao = `${formatarPreco(relogio.preco.toString())} · Ref. ${relogio.referencia}. ${TEXTO_PARCELAMENTO}.`;
  const imagem = relogio.fotos[0]?.url;

  return {
    title: titulo,
    description: descricao,
    openGraph: {
      title: titulo,
      description: descricao,
      images: imagem ? [{ url: imagem, width: 800, height: 800 }] : undefined,
    },
  };
}

export default async function RelogioDetalhePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const relogio = await buscarRelogioPorSlug(slug);

  if (!relogio) notFound();

  const similares = await listarRelogiosSimilares(relogio);
  const mensagem = `Olá! Tenho interesse neste relógio: ${relogio.marca} ${relogio.modelo} - Ref. ${relogio.referencia}`;
  const historiaMarca = buscarHistoriaMarca(relogio.marca);

  return (
    <div className="pb-28 sm:pb-0">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <Breadcrumb
          items={[
            { label: "Catálogo", href: "/catalogo" },
            {
              label: relogio.feminino ? "Femininos" : "Pronta Entrega",
              href: relogio.feminino ? "/catalogo/femininos" : "/catalogo/pronta-entrega",
            },
            { label: `${relogio.marca} ${relogio.modelo}` },
          ]}
        />

        <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <GaleriaFotos fotos={relogio.fotos} alt={`${relogio.marca} ${relogio.modelo}`} />

          <div className="flex flex-col gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-[0.1em] text-muted">{relogio.marca}</span>
              <h1 className="font-serif text-2xl">{relogio.modelo}</h1>
              <span className="text-xs text-muted">Ref. {relogio.referencia}</span>
            </div>

            <div>
              <span className="text-xl text-ink">{formatarPreco(relogio.preco.toString())}</span>
              <p className="mt-1 text-xs text-muted">{TEXTO_PARCELAMENTO}</p>
            </div>

            <div className="hidden sm:block">
              <WhatsAppButton mensagem={mensagem} />
            </div>

            <SeloAutenticidade />

            <FichaTecnica relogio={relogio} />

            {historiaMarca && (
              <div className="border-t border-hairline pt-4">
                <h2 className="text-[11px] uppercase tracking-[0.1em] text-muted">
                  Sobre a {relogio.marca}
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-ink/80">{historiaMarca}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <RelogiosSimilares relogios={similares} />

      <WhatsAppButton mensagem={mensagem} sticky />
    </div>
  );
}
