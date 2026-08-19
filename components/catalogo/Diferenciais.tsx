import { Package, ShieldCheck, MessageCircle, CreditCard } from "lucide-react";

const ITENS = [
  {
    icone: Package,
    titulo: "Estoque próprio",
    texto: "Compramos, revisamos e revendemos cada peça — sem intermediação.",
  },
  {
    icone: ShieldCheck,
    titulo: "Autenticidade verificada",
    texto: "Todo relógio passa por um processo criterioso de verificação.",
  },
  {
    icone: MessageCircle,
    titulo: "Atendimento direto",
    texto: "Fale com a gente pelo WhatsApp, do primeiro contato ao pós-venda.",
  },
  {
    icone: CreditCard,
    titulo: "Parcelamento facilitado",
    texto: "Aceitamos parcelamento em até 12x com juros.",
  },
];

export function Diferenciais() {
  return (
    <section className="border-y border-hairline">
      <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-hairline sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
        {ITENS.map((item) => {
          const Icone = item.icone;
          return (
            <div key={item.titulo} className="flex flex-col items-center gap-3 px-6 py-10 text-center">
              <Icone size={24} className="text-ink" strokeWidth={1.5} />
              <h3 className="text-xs font-medium uppercase tracking-[0.08em] text-ink">{item.titulo}</h3>
              <p className="text-[11px] leading-relaxed text-muted">{item.texto}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
