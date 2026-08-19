import { RelogioComFotos } from "@/lib/types";
import { CONDICAO_LABEL } from "@/lib/constants";

export function FichaTecnica({ relogio }: { relogio: RelogioComFotos }) {
  const itens: [string, string | null][] = [
    ["Referência", relogio.referencia],
    ["Condição", CONDICAO_LABEL[relogio.condicao]],
    ["Diâmetro da caixa", relogio.diametroCaixa],
    ["Movimento", relogio.movimento],
    ["Pulseira", relogio.pulseira],
    ["Vidro", relogio.vidro],
    ["Material da caixa", relogio.materialCaixa],
    ["Ano / Estado", relogio.anoEstado],
  ];

  const preenchidos = itens.filter(([, valor]) => valor);

  if (preenchidos.length === 0) return null;

  return (
    <dl className="mt-2 border-t border-hairline">
      {preenchidos.map(([label, valor]) => (
        <div key={label} className="flex items-center justify-between border-b border-hairline py-3">
          <dt className="text-[11px] uppercase tracking-[0.04em] text-muted">{label}</dt>
          <dd className="text-xs text-ink">{valor}</dd>
        </div>
      ))}
    </dl>
  );
}
