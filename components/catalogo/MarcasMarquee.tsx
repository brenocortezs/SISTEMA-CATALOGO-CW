const MARCAS = ["Tag Heuer", "Bvlgari", "Omega", "Breitling", "Cartier", "Rolex", "Tudor", "Hublot"];

export function MarcasMarquee() {
  return (
    <div className="bg-paper py-10">
      <span className="block text-center text-[11px] uppercase tracking-[0.16em] text-muted">
        Marcas que trabalhamos
      </span>

      <div className="mt-6 overflow-hidden select-none">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((rep) => (
            <div key={rep} className="flex shrink-0 gap-4 pr-4">
              {MARCAS.map((marca) => (
                <span
                  key={`${rep}-${marca}`}
                  className="flex h-16 shrink-0 items-center justify-center border border-hairline px-8 font-serif text-base uppercase tracking-[0.1em] whitespace-nowrap text-ink"
                >
                  {marca}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
