"use client";

import { useEffect, useState } from "react";
import { CardRelogio } from "@/components/catalogo/CardRelogio";
import { Breadcrumb } from "@/components/catalogo/Breadcrumb";
import { getFavoritos, onFavoritosChange } from "@/lib/favoritos";
import type { RelogioComFotos } from "@/lib/types";

export default function FavoritosPage() {
  const [relogios, setRelogios] = useState<RelogioComFotos[] | null>(null);

  useEffect(() => {
    async function carregar() {
      const ids = getFavoritos();
      if (ids.length === 0) {
        setRelogios([]);
        return;
      }
      const res = await fetch(`/api/catalogo/relogios-por-ids?ids=${ids.join(",")}`);
      const data = await res.json();
      setRelogios(data);
    }
    carregar();
    return onFavoritosChange(carregar);
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumb items={[{ label: "Catálogo", href: "/catalogo" }, { label: "Favoritos" }]} />

      <h1 className="mt-4 font-serif text-2xl tracking-[0.04em]">Favoritos</h1>
      <p className="mt-2 text-xs uppercase tracking-[0.06em] text-muted">
        Relógios que você salvou para ver depois.
      </p>

      {relogios === null ? null : relogios.length === 0 ? (
        <p className="mt-12 text-muted">
          Você ainda não salvou nenhum relógio. Clique no coração de um item do catálogo para
          adicioná-lo aqui.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {relogios.map((relogio) => (
            <CardRelogio key={relogio.id} relogio={relogio} />
          ))}
        </div>
      )}
    </div>
  );
}
