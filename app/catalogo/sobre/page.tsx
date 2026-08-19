import { Heart, Package, ShieldCheck, Users } from "lucide-react";
import { PageHeader } from "@/components/catalogo/PageHeader";
import { SeloAutenticidade } from "@/components/catalogo/SeloAutenticidade";

export const metadata = {
  title: "Sobre — Concept Watch",
  description: "Conheça a história da Concept Watch e nosso compromisso com autenticidade.",
};

const BLOCOS = [
  {
    icone: Heart,
    titulo: "Nossa origem",
    texto:
      "A Concept Watch nasceu da paixão por relojoaria de alto padrão e da vontade de tornar esse mercado mais acessível, transparente e confiável no Brasil.",
  },
  {
    icone: Package,
    titulo: "3 anos de mercado",
    texto:
      "Trabalhamos com a compra, venda e intermediação de relógios de luxo de marcas como Tag Heuer, Bvlgari, Omega, Breitling, Rolex, Cartier e Hublot.",
  },
  {
    icone: ShieldCheck,
    titulo: "Verificação em cada peça",
    texto:
      "Cada peça que passa pela Concept Watch é verificada e, quando necessário, revisada antes de chegar até você, garantindo autenticidade e qualidade em todas as etapas.",
  },
  {
    icone: Users,
    titulo: "Atendimento próximo",
    texto:
      "Acompanhamos cada cliente de perto, do primeiro contato ao pós-venda. Por trás de cada negociação está alguém que entende de relógios e trata cada peça com o cuidado que ela merece.",
  },
];

export default function SobrePage() {
  return (
    <div>
      <PageHeader
        eyebrow="Sobre nós"
        titulo="Sobre a Concept Watch"
        breadcrumb={[{ label: "Catálogo", href: "/catalogo" }, { label: "Sobre" }]}
      />

      <div className="mx-auto max-w-5xl px-4 py-14">
        <div className="grid grid-cols-1 gap-px bg-hairline sm:grid-cols-2">
          {BLOCOS.map((bloco, i) => {
            const Icone = bloco.icone;
            return (
              <div key={bloco.titulo} className="flex flex-col gap-3 bg-paper p-8">
                <div className="flex items-center justify-between">
                  <Icone size={22} className="text-ink" strokeWidth={1.5} />
                  <span className="font-serif text-3xl text-hairline">{`0${i + 1}`}</span>
                </div>
                <h2 className="font-serif text-lg">{bloco.titulo}</h2>
                <p className="text-sm leading-relaxed text-ink/80">{bloco.texto}</p>
              </div>
            );
          })}
        </div>

        <div className="mx-auto mt-14 max-w-2xl text-center">
          <p className="leading-relaxed text-ink/80">
            Se você busca um relógio com procedência garantida e um atendimento à altura da peça
            que está adquirindo, a Concept Watch está pronta para te atender.
          </p>
          <div className="mt-6 flex justify-center">
            <SeloAutenticidade />
          </div>
        </div>
      </div>
    </div>
  );
}
