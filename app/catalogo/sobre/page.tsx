import { Breadcrumb } from "@/components/catalogo/Breadcrumb";

export const metadata = {
  title: "Sobre — Concept Watch",
  description: "Conheça a história da Concept Watch e nosso compromisso com autenticidade.",
};

export default function SobrePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <Breadcrumb items={[{ label: "Catálogo", href: "/catalogo" }, { label: "Sobre" }]} />

      <h1 className="mt-4 font-serif text-2xl tracking-[0.04em]">Sobre a Concept Watch</h1>

      <div className="mt-8 flex flex-col gap-6 leading-relaxed text-ink/80">
        <p>
          A Concept Watch nasceu da paixão por relojoaria de alto padrão e da vontade de tornar
          esse mercado mais acessível, transparente e confiável no Brasil.
        </p>

        <p>
          Há 3 anos no mercado, trabalhamos com a compra, venda e intermediação de relógios de
          luxo de marcas como Tag Heuer, Bvlgari, Omega, Breitling, Rolex, Cartier, Hublot... Cada
          peça que passa pela Concept Watch é verificada e, quando necessário, revisada antes de
          chegar até você, garantindo autenticidade e qualidade em todas as etapas.
        </p>

        <p>
          Nosso compromisso vai além da venda. Acompanhamos cada cliente de perto, do primeiro
          contato ao pós-venda, com atendimento próximo e personalizado. Por trás de cada
          negociação está alguém que entende de relógios e que trata cada peça com o cuidado que
          ela merece.
        </p>

        <p>
          Se você busca um relógio com procedência garantida e um atendimento à altura da peça
          que está adquirindo, a Concept Watch está pronta para te atender.
        </p>
      </div>
    </div>
  );
}
