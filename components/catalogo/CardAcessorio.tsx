import Image from "next/image";
import { AcessorioComFotos } from "@/lib/types";
import { formatarPreco } from "@/lib/format";
import { TIPO_ACESSORIO_LABEL } from "@/lib/constants";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";

export function CardAcessorio({ acessorio }: { acessorio: AcessorioComFotos }) {
  const capa = acessorio.fotos[0];

  return (
    <div className="flex flex-col">
      <div className="relative aspect-square w-full bg-ink-hairline">
        {capa ? (
          <Image
            src={capa.url}
            alt={acessorio.nome}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover"
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
