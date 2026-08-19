const STATS = (totalRelogios: number, totalMarcas: number) => [
  { valor: "3+", label: "Anos de mercado" },
  { valor: String(totalRelogios), label: "Relógios em estoque" },
  { valor: String(totalMarcas), label: "Marcas trabalhadas" },
  { valor: "100%", label: "Autenticidade verificada" },
];

export function StatsBand({ totalRelogios, totalMarcas }: { totalRelogios: number; totalMarcas: number }) {
  const stats = STATS(totalRelogios, totalMarcas);

  return (
    <section className="bg-ink-bg py-14">
      <div className="mx-auto max-w-6xl px-4">
        <span className="block text-center text-[11px] uppercase tracking-[0.16em] text-ink-muted">
          Em números
        </span>
        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="border-b border-ink-hairline pb-4 text-center">
              <span className="font-serif text-4xl text-ink-text">{stat.valor}</span>
              <p className="mt-2 text-[10px] uppercase tracking-[0.08em] text-ink-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
