"use client";

import { useSyncExternalStore } from "react";
import { Heart } from "lucide-react";
import clsx from "clsx";
import { isFavorito, toggleFavorito, onFavoritosChange } from "@/lib/favoritos";

export function FavoritoButton({ relogioId, className }: { relogioId: string; className?: string }) {
  const favorito = useSyncExternalStore(
    onFavoritosChange,
    () => isFavorito(relogioId),
    () => false
  );

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorito(relogioId);
  }

  return (
    <button
      type="button"
      aria-label={favorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      onClick={handleClick}
      className={clsx(
        "flex h-8 w-8 items-center justify-center bg-paper/80 backdrop-blur transition-colors hover:bg-paper",
        className
      )}
    >
      <Heart size={16} className={favorito ? "fill-ink text-ink" : "text-ink"} />
    </button>
  );
}
