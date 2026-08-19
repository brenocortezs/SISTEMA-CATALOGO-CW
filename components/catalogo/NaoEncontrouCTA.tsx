import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { MENSAGEM_NAO_ENCONTROU } from "@/lib/constants";

export function NaoEncontrouCTA() {
  return (
    <div className="mt-12 flex flex-col items-center gap-3 border-t border-hairline pt-10 text-center">
      <p className="text-sm text-muted">Não achou o que procura?</p>
      <WhatsAppButton
        mensagem={MENSAGEM_NAO_ENCONTROU}
        texto="Fale com a gente"
        variant="outline"
      />
    </div>
  );
}
