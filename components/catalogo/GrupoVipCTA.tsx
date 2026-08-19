import { GRUPO_VIP_URL } from "@/lib/constants";

export function GrupoVipCTA() {
  return (
    <section className="bg-ink-bg px-4 py-16 text-center">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6">
        <h2 className="font-serif text-2xl text-ink-text sm:text-3xl">Grupo VIP Concept Watch</h2>
        <p className="text-sm text-ink-muted">
          Para garantir todas as nossas novidades em primeira mão e ter condições exclusivas,
          entre agora no nosso Grupo VIP do WhatsApp.
        </p>
        <a
          href={GRUPO_VIP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-ink-text px-8 py-4 text-xs font-medium uppercase tracking-[0.1em] text-ink-bg transition-opacity hover:opacity-80"
        >
          Entrar no Grupo VIP
        </a>
      </div>
    </section>
  );
}
