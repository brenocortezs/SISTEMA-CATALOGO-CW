import Image from "next/image";
import type { Depoimento } from "@/lib/types";

export function CarrosselDepoimentos({ depoimentos }: { depoimentos: Depoimento[] }) {
  return (
    <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
      {depoimentos.map(
        (depoimento) =>
          depoimento.imagem && (
            <div key={depoimento.id} className="mb-4 break-inside-avoid border border-hairline">
              <Image
                src={depoimento.imagem}
                alt="Depoimento de cliente"
                width={600}
                height={900}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="h-auto w-full object-cover"
              />
            </div>
          )
      )}
    </div>
  );
}
