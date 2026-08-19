import Image from "next/image";
import Link from "next/link";
import { RelogioComFotos } from "@/lib/types";
import { formatarPreco, ehRecemChegado } from "@/lib/format";
import { TEXTO_PARCELAMENTO } from "@/lib/constants";
import { FavoritoButton } from "@/components/catalogo/FavoritoButton";

export function CardRelogio({ relogio }: { relogio: RelogioComFotos }) {
  const capa = relogio.fotos[0];

  return (
    <Link href={`/catalogo/relogio/${relogio.slug}`} className="group flex flex-col">
      <div className="relative aspect-square w-full bg-hairline/40">
        {capa ? (
          <Image
            src={capa.url}
            alt={`${relogio.marca} ${relogio.modelo}`}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted">Sem foto</div>
        )}

        {ehRecemChegado(relogio.criadoEm) && (
          <span className="absolute left-2 top-2 bg-ink px-2 py-1 text-[9px] uppercase tracking-[0.08em] text-paper">
            Recém-chegado
          </span>
        )}

        <FavoritoButton relogioId={relogio.id} className="absolute right-2 top-2" />
      </div>

      <div className="flex flex-1 flex-col gap-1 pt-2">
        <span className="text-[10px] uppercase tracking-[0.1em] text-muted">{relogio.marca}</span>
        <h3 className="text-[13px] leading-tight text-ink">{relogio.modelo}</h3>
        <span className="mt-0.5 text-[13px] text-ink">{formatarPreco(relogio.preco.toString())}</span>
        <span className="text-[10px] text-muted">{TEXTO_PARCELAMENTO}</span>
      </div>
    </Link>
  );
}
