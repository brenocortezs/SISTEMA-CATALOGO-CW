import Image from "next/image";
import { AcessorioComFotos } from "@/lib/types";
import { formatarPreco } from "@/lib/format";
import { TIPO_ACESSORIO_LABEL } from "@/lib/constants";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";

export function CardAcessorio({ acessorio }: { acessorio: AcessorioComFotos }) {
  const capa = acessorio.fotos[0];

  return (
    <div className="group flex flex-col">
      <div className="relative aspect-square w-full overflow-hidden bg-ink-hairline shadow-[0_0_0_1px_var(--color-ink-hairline)] transition-shadow duration-300 group-hover:shadow-[0_0_0_1px_var(--color-ink-text)]">
        {capa ? (
          <Image
            src={capa.url}
            alt={acessorio.nome}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-ink-muted">Sem foto</div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 pt-2">
        <span className="text-[10px] uppercase tracking-[0.08em] text-ink-muted">
          {TIPO_ACESSORIO_LABEL[acessorio.tipo]}
        </span>
        <h3 className="text-[13px] leading-tight text-ink-text">{acessorio.nome}</h3>
        <span className="mt-0.5 text-[13px] text-ink-text">{formatarPreco(acessorio.preco.toString())}</span>
        {acessorio.descricao && (
          <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-ink-muted">{acessorio.descricao}</p>
        )}

        <WhatsAppButton
          mensagem={`Olá! Tenho interesse neste acessório: ${acessorio.nome}`}
          tone="dark"
          variant="outline"
          className="mt-3"
        />
      </div>
    </div>
  );
}
