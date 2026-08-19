"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadFotos, type FotoUpload } from "@/components/admin/UploadFotos";
import type { Depoimento } from "@/lib/types";

export function FormDepoimento({ depoimento }: { depoimento?: Depoimento }) {
  const router = useRouter();
  const isEdit = !!depoimento;

  const [fotos, setFotos] = useState<FotoUpload[]>(
    depoimento?.imagem ? [{ url: depoimento.imagem }] : []
  );

  const [salvando, setSalvando] = useState(false);
  const [excluindo, setExcluindo] = useState(false);
  const [erro, setErro] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");

    if (!fotos[0]?.url) {
      setErro("Envie o print do depoimento antes de salvar.");
      return;
    }

    setSalvando(true);

    const payload = { imagem: fotos[0].url };

    const res = await fetch(isEdit ? `/api/depoimentos/${depoimento!.id}` : "/api/depoimentos", {
      method: isEdit ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSalvando(false);

    if (!res.ok) {
      setErro("Não foi possível salvar.");
      return;
    }

    router.push("/admin/depoimentos");
    router.refresh();
  }

  async function handleExcluir() {
    if (!depoimento) return;
    if (!confirm("Excluir este depoimento? Esta ação não pode ser desfeita.")) return;

    setExcluindo(true);
    const res = await fetch(`/api/depoimentos/${depoimento.id}`, { method: "DELETE" });
    setExcluindo(false);

    if (!res.ok) {
      setErro("Não foi possível excluir.");
      return;
    }

    router.push("/admin/depoimentos");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <p className="mb-2 text-sm text-neutral-500">
          Envie o print da conversa do WhatsApp com o feedback do cliente (sem nome, sem texto — só a imagem).
        </p>
        <UploadFotos fotos={fotos} onChange={(f) => setFotos(f.slice(-1))} />
      </div>

      {erro && <p className="text-sm text-red-600">{erro}</p>}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={salvando}
          className="rounded-full bg-black px-6 py-3 text-sm font-medium uppercase tracking-wide text-white hover:bg-neutral-800 disabled:opacity-50"
        >
          {salvando ? "Salvando..." : "Salvar"}
        </button>

        {isEdit && (
          <button
            type="button"
            onClick={handleExcluir}
            disabled={excluindo}
            className="text-sm text-red-600 hover:underline disabled:opacity-50"
          >
            {excluindo ? "Excluindo..." : "Excluir depoimento"}
          </button>
        )}
      </div>
    </form>
  );
}
