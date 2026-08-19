"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search } from "lucide-react";

const FAIXAS_PRECO = [
  { label: "Qualquer preço", min: "", max: "" },
  { label: "Até R$ 20.000", min: "", max: "20000" },
  { label: "R$ 20.000 - R$ 50.000", min: "20000", max: "50000" },
  { label: "Acima de R$ 50.000", min: "50000", max: "" },
];

const ORDENACOES = [
  { label: "Mais recentes", value: "" },
  { label: "Menor preço", value: "menor-preco" },
  { label: "Maior preço", value: "maior-preco" },
];

export function FiltrosCatalogo({ marcas }: { marcas: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [busca, setBusca] = useState(searchParams.get("busca") ?? "");

  function atualizarParam(chave: string, valor: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (valor) params.set(chave, valor);
    else params.delete(chave);
    router.push(`${pathname}?${params.toString()}`);
  }

  function atualizarFaixa(faixa: (typeof FAIXAS_PRECO)[number]) {
    const params = new URLSearchParams(searchParams.toString());
    if (faixa.min) params.set("precoMin", faixa.min);
    else params.delete("precoMin");
    if (faixa.max) params.set("precoMax", faixa.max);
    else params.delete("precoMax");
    router.push(`${pathname}?${params.toString()}`);
  }

  useEffect(() => {
    const atual = searchParams.get("busca") ?? "";
    if (busca === atual) return;
    const timeout = setTimeout(() => atualizarParam("busca", busca), 400);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busca]);

  const faixaAtualLabel =
    FAIXAS_PRECO.find(
      (f) => f.min === (searchParams.get("precoMin") ?? "") && f.max === (searchParams.get("precoMax") ?? "")
    )?.label ?? FAIXAS_PRECO[0].label;

  const ordenarAtual = searchParams.get("ordenar") ?? "";

  const chip =
    "shrink-0 border border-ink bg-transparent px-4 py-2 text-[10px] uppercase tracking-[0.08em] text-ink outline-none cursor-pointer";

  return (
    <div className="flex flex-col gap-3">
      <div className="relative w-full sm:max-w-xs">
        <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar por marca, modelo ou referência"
          className="w-full border border-hairline bg-transparent py-2 pl-9 pr-3 text-xs text-ink outline-none focus:border-ink"
        />
      </div>

      <div className="flex flex-nowrap gap-2 overflow-x-auto pb-1">
        <select
          value={searchParams.get("marca") ?? ""}
          onChange={(e) => atualizarParam("marca", e.target.value)}
          className={chip}
        >
          <option value="">Marca</option>
          {marcas.map((marca) => (
            <option key={marca} value={marca}>
              {marca}
            </option>
          ))}
        </select>

        <select
          value={faixaAtualLabel}
          onChange={(e) => {
            const faixa = FAIXAS_PRECO.find((f) => f.label === e.target.value);
            if (faixa) atualizarFaixa(faixa);
          }}
          className={chip}
        >
          {FAIXAS_PRECO.map((faixa) => (
            <option key={faixa.label} value={faixa.label}>
              {faixa.label}
            </option>
          ))}
        </select>

        <select
          value={searchParams.get("condicao") ?? ""}
          onChange={(e) => atualizarParam("condicao", e.target.value)}
          className={chip}
        >
          <option value="">Condição</option>
          <option value="NOVO">Novo</option>
          <option value="SEMINOVO">Seminovo</option>
        </select>

        <select
          value={ordenarAtual}
          onChange={(e) => atualizarParam("ordenar", e.target.value)}
          className={chip}
        >
          {ORDENACOES.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
