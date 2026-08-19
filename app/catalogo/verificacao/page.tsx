import { Eye, Gauge, Wrench, BadgeCheck } from "lucide-react";
import { Breadcrumb } from "@/components/catalogo/Breadcrumb";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";

export const metadata = {
  title: "Processo de Verificação — Concept Watch",
  description:
    "Conheça as etapas do nosso processo de verificação: estética, movimento, maquinário interno e avaliação final.",
};

const ETAPAS = [
  {
    icone: Eye,
    titulo: "Verificação de detalhes estéticos",
    texto:
      "Inspecionamos caixa, mostrador, pulseira, acabamentos e gravações, comparando cada detalhe com os padrões originais de fábrica.",
  },
  {
    icone: Gauge,
    titulo: "Verificação do movimento com timegrapher",
    texto:
      "Relógios automáticos passam pelo timegrapher, equipamento que mede a precisão do movimento e confirma se ele está dentro dos parâmetros esperados.",
  },
  {
    icone: Wrench,
    titulo: "Análise do relojoeiro",
    texto:
      "Um relojoeiro experiente avalia o maquinário interno do calibre, verificando o estado real do movimento por trás da caixa.",
  },
  {
    icone: BadgeCheck,
    titulo: "Avaliação final e serviço, se necessário",
    texto:
      "Todos os relógios passam pela avaliação de um profissional para verificação e realização de algum serviço, se necessário. Nosso objetivo é sempre anunciar uma peça 100% para o cliente.",
  },
];

export default function VerificacaoPage() {
  const mensagem = "Olá! Tenho uma dúvida sobre o processo de verificação da Concept Watch.";

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <Breadcrumb items={[{ label: "Catálogo", href: "/catalogo" }, { label: "Verificação" }]} />

      <h1 className="mt-4 font-serif text-2xl tracking-[0.04em]">Nosso processo de verificação</h1>

      <p className="mt-4 leading-relaxed text-ink/80">
        Cada relógio que passa pela Concept Watch é submetido a um processo de verificação
        criterioso antes de chegar até você. Veja como funciona.
      </p>

      <div className="mt-10 flex flex-col gap-8">
        {ETAPAS.map((etapa, i) => {
          const Icone = etapa.icone;
          return (
            <div key={etapa.titulo} className="flex gap-4 border-t border-hairline pt-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-hairline">
                <Icone size={18} className="text-ink" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-[0.1em] text-muted">
                  Etapa {i + 1}
                </span>
                <h2 className="mt-1 font-serif text-lg">{etapa.titulo}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink/80">{etapa.texto}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 border-t border-hairline pt-8">
        <p className="leading-relaxed text-ink/80">
          Se você tiver qualquer dúvida sobre a procedência ou o estado de uma peça, fale
          diretamente com a gente pelo WhatsApp.
        </p>
        <div className="mt-4">
          <WhatsAppButton mensagem={mensagem} />
        </div>
      </div>
    </div>
  );
}
