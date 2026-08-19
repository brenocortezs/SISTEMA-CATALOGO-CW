"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function BotaoExcluirUsuario({ id, usuario }: { id: string; usuario: string }) {
  const router = useRouter();
  const [excluindo, setExcluindo] = useState(false);

  async function handleExcluir() {
    if (!confirm(`Remover o acesso de "${usuario}"? Esta ação não pode ser desfeita.`)) return;

    setExcluindo(true);
    const res = await fetch(`/api/usuarios/${id}`, { method: "DELETE" });
    setExcluindo(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert(data.error ?? "Não foi possível remover o usuário.");
      return;
    }

    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleExcluir}
      disabled={excluindo}
      className="text-sm text-red-600 hover:underline disabled:opacity-50"
    >
      {excluindo ? "Removendo..." : "Remover"}
    </button>
  );
}
