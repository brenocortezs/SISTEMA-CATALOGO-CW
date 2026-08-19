"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import clsx from "clsx";
import { Lightbox } from "@/components/catalogo/Lightbox";

export function GaleriaFotos({
  fotos,
  alt,
}: {
  fotos: { url: string }[];
  alt: string;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: fotos.length > 1 });
  const [selected, setSelected] = useState(0);
  const [lightboxAberto, setLightboxAberto] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (fotos.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center bg-hairline/40 text-muted">
        Sem fotos
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative overflow-hidden bg-hairline/40">
        <div className="embla" ref={emblaRef}>
          <div className="flex">
            {fotos.map((foto, i) => (
              <button
                key={foto.url + i}
                type="button"
                aria-label="Ampliar foto"
                onClick={() => setLightboxAberto(true)}
                className="relative aspect-square min-w-0 flex-[0_0_100%] cursor-zoom-in"
              >
                <Image
                  src={foto.url}
                  alt={`${alt} - foto ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority={i === 0}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-2 right-2 bg-paper/80 p-1.5">
          <ZoomIn size={16} />
        </div>

        {fotos.length > 1 && (
          <>
            <button
              aria-label="Foto anterior"
              onClick={() => emblaApi?.scrollPrev()}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-paper/80 p-2 shadow hover:bg-paper"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              aria-label="Próxima foto"
              onClick={() => emblaApi?.scrollNext()}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-paper/80 p-2 shadow hover:bg-paper"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {fotos.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {fotos.map((foto, i) => (
            <button
              key={foto.url + i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={clsx(
                "relative h-16 w-16 shrink-0 overflow-hidden border-2",
                selected === i ? "border-ink" : "border-transparent"
              )}
            >
              <Image src={foto.url} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {lightboxAberto && (
        <Lightbox
          fotos={fotos}
          initialIndex={selected}
          alt={alt}
          onClose={() => setLightboxAberto(false)}
        />
      )}
    </div>
  );
}
