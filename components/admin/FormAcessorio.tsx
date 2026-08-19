"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadFotos, type FotoUpload } from "@/components/admin/UploadFotos";
import type { AcessorioComFotos } from "@/lib/types";

type AcessorioFormData = Omit<AcessorioComFotos, "preco"> & { preco: number };

export function FormAcessorio({ acessorio }: { acessorio?: AcessorioFormData }) {
  const router = useRouter();
  const isEdit = !!acessorio;

  const [tipo, setTipo] = useState(acessorio?.tipo ?? "PORTA_RELOGIO");
  const [nome, setNome] = useState(acessorio?.nome ?? "");
  const [descricao, setDescricao] = useState(acessorio?.descricao ?? "");
  const [preco, setPreco] = useState(acessorio?.preco?.toString() ?? "");
  const [status, setStatus] = useState(acessorio?.status ?? "DISPONIVEL");
  const [fotos, setFotos] = useState<FotoUpload[]>(
    acessorio?.fotos.map((f) => ({ url: f.url })) ?? []
  );

  const [salvando, setSalvando] = useState(false);
  const [excluindo, setExcluindo] = useState(false);
  const [erro, setErro] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setSalvando(true);

    const payload = {
      tipo,
      nome,
      descricao: descricao || null,
      preco: Number(preco),
      status,
      fotos: fotos.map((f, i) => ({ url: f.url, ordem: i })),
    };

    const res = await fetch(isEdit ? `/api/acessorios/${acessorio!.id}` : "/api/acessorios", {
      method: isEdit ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSalvando(false);

    if (!res.ok) {
      setErro("Não foi possível salvar. Confira os campos obrigatórios.");
      return;
    }

    router.push("/admin/acessorios");
    router.refresh();
  }

  async function handleExcluir() {
    if (!acessorio) return;
    if (!confirm(`Excluir ${acessorio.nome}? Esta ação não pode ser desfeita.`)) return;

    setExcluindo(true);
    const res = await fetch(`/api/acessorios/${acessorio.id}`, { method: "DELETE" });
    setExcluindo(false);

    if (!res.ok) {
      setErro("Não foi possível excluir.");
      return;
    }

    router.push("/admin/acessorios");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <UploadFotos fotos={fotos} onChange={setFotos} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm uppercase tracking-wide text-neutral-500">Tipo</label>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value as typeof tipo)}
            className="mt-1 w-full rounded border border-neutral-300 px-3 py-2"
          >
            <option value="PORTA_RELOGIO">Porta-relógio</option>
            <option value="PULSEIRA">Pulseira</option>
            <option value="MALETA">Maleta</option>
          </select>
        </div>

        <div>
          <label className="text-sm uppercase tracking-wide text-neutral-500">Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="mt-1 w-full rounded border border-neutral-300 px-3 py-2"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="text-sm uppercase tracking-wide text-neutral-500">Descrição</label>
          <textarea
            value={descricao ?? ""}
            onChange={(e) => setDescricao(e.target.value)}
            rows={4}
            placeholder="Detalhes do item: material, estado de conservação, dimensões, etc."
            className="mt-1 w-full rounded border border-neutral-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="text-sm uppercase tracking-wide text-neutral-500">Preço (R$)</label>
          <input
            type="number"
            step="0.01"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
            className="mt-1 w-full rounded border border-neutral-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="text-sm uppercase tracking-wide text-neutral-500">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as typeof status)}
            className="mt-1 w-full rounded border border-neutral-300 px-3 py-2"
          >
            <option value="DISPONIVEL">Disponível</option>
            <option value="VENDIDO">Vendido</option>
          </select>
        </div>
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
            {excluindo ? "Excluindo..." : "Excluir acessório"}
          </button>
        )}
      </div>
    </form>
  );
}
