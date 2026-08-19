import { CardRelogio } from "@/components/catalogo/CardRelogio";
import type { RelogioComFotos } from "@/lib/types";

export function RelogiosSimilares({ relogios }: { relogios: RelogioComFotos[] }) {
  if (relogios.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl border-t border-hairline px-4 py-14">
      <h2 className="text-xs uppercase tracking-[0.12em] text-muted">Você também pode gostar</h2>
      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
        {relogios.map((relogio) => (
          <CardRelogio key={relogio.id} relogio={relogio} />
        ))}
      </div>
    </section>
  );
}
