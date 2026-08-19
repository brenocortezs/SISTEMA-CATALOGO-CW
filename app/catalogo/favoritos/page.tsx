"use client";

import { useEffect, useState } from "react";
import { CardRelogio } from "@/components/catalogo/CardRelogio";
import { PageHeader } from "@/components/catalogo/PageHeader";
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
    <div>
      <PageHeader
        eyebrow="Sua lista"
        titulo="Favoritos"
        subtitulo="Relógios que você salvou para ver depois."
        breadcrumb={[{ label: "Catálogo", href: "/catalogo" }, { label: "Favoritos" }]}
      />

      <div className="mx-auto max-w-6xl px-4 py-10">
        {relogios === null ? null : relogios.length === 0 ? (
          <p className="text-muted">
            Você ainda não salvou nenhum relógio. Clique no coração de um item do catálogo para
            adicioná-lo aqui.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
            {relogios.map((relogio) => (
              <CardRelogio key={relogio.id} relogio={relogio} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
