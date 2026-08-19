"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";
import type { Depoimento } from "@/lib/types";
import { Lightbox } from "@/components/catalogo/Lightbox";

export function CarrosselDepoimentos({ depoimentos }: { depoimentos: Depoimento[] }) {
  const [indiceAberto, setIndiceAberto] = useState<number | null>(null);
  const fotos = depoimentos
    .filter((d): d is Depoimento & { imagem: string } => !!d.imagem)
    .map((d) => ({ url: d.imagem }));

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {fotos.map((foto, i) => (
          <button
            key={foto.url + i}
            type="button"
            aria-label="Ampliar depoimento"
            onClick={() => setIndiceAberto(i)}
            className="group relative aspect-[9/16] w-full overflow-hidden border border-hairline"
          >
            <Image
              src={foto.url}
              alt="Print de depoimento de cliente no WhatsApp"
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink-bg/0 transition-colors group-hover:bg-ink-bg/20">
              <ZoomIn
                size={20}
                className="text-paper opacity-0 drop-shadow transition-opacity group-hover:opacity-100"
              />
            </div>
          </button>
        ))}
      </div>

      {indiceAberto !== null && (
        <Lightbox
          fotos={fotos}
          initialIndex={indiceAberto}
          alt="Depoimento de cliente"
          onClose={() => setIndiceAberto(null)}
        />
      )}
    </>
  );
}
