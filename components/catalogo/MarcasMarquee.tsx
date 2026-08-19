const MARCAS = ["Tag Heuer", "Bvlgari", "Omega", "Breitling", "Cartier", "Rolex", "Tudor", "Hublot"];

export function MarcasMarquee() {
  return (
    <div className="overflow-hidden border-y border-hairline py-6 select-none">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((rep) => (
          <div key={rep} className="flex shrink-0 gap-12 pr-12">
            {MARCAS.map((marca) => (
              <span
                key={`${rep}-${marca}`}
                className="font-serif text-lg uppercase tracking-[0.14em] whitespace-nowrap text-muted sm:text-xl"
              >
                {marca}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
