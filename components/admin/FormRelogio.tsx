"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadFotos, type FotoUpload } from "@/components/admin/UploadFotos";
import type { RelogioComFotos } from "@/lib/types";

type RelogioFormData = Omit<RelogioComFotos, "preco"> & { preco: number };

export function FormRelogio({ relogio }: { relogio?: RelogioFormData }) {
  const router = useRouter();
  const isEdit = !!relogio;

  const [marca, setMarca] = useState(relogio?.marca ?? "");
  const [modelo, setModelo] = useState(relogio?.modelo ?? "");
  const [referencia, setReferencia] = useState(relogio?.referencia ?? "");
  const [preco, setPreco] = useState(relogio?.preco?.toString() ?? "");
  const [condicao, setCondicao] = useState(relogio?.condicao ?? "SEMINOVO");
  const [diametroCaixa, setDiametroCaixa] = useState(relogio?.diametroCaixa ?? "");
  const [movimento, setMovimento] = useState(relogio?.movimento ?? "");
  const [pulseira, setPulseira] = useState(relogio?.pulseira ?? "");
  const [vidro, setVidro] = useState(relogio?.vidro ?? "");
  const [materialCaixa, setMaterialCaixa] = useState(relogio?.materialCaixa ?? "");
  const [anoEstado, setAnoEstado] = useState(relogio?.anoEstado ?? "");
  const [feminino, setFeminino] = useState(relogio?.feminino ?? false);
  const [destaque, setDestaque] = useState(relogio?.destaque ?? false);
  const [status, setStatus] = useState(relogio?.status ?? "DISPONIVEL");
  const [fotos, setFotos] = useState<FotoUpload[]>(
    relogio?.fotos.map((f) => ({ url: f.url })) ?? []
  );

  const [salvando, setSalvando] = useState(false);
  const [excluindo, setExcluindo] = useState(false);
  const [erro, setErro] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setSalvando(true);

    const payload = {
      marca,
      modelo,
      referencia,
      preco: Number(preco),
      condicao,
      diametroCaixa: diametroCaixa || null,
      movimento: movimento || null,
      pulseira: pulseira || null,
      vidro: vidro || null,
      materialCaixa: materialCaixa || null,
      anoEstado: anoEstado || null,
      feminino,
      destaque,
      status,
      fotos: fotos.map((f, i) => ({ url: f.url, ordem: i })),
    };

    const res = await fetch(isEdit ? `/api/relogios/${relogio!.id}` : "/api/relogios", {
      method: isEdit ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSalvando(false);

    if (!res.ok) {
      setErro("Não foi possível salvar. Confira os campos obrigatórios.");
      return;
    }

    router.push("/admin/relogios");
    router.refresh();
  }

  async function handleExcluir() {
    if (!relogio) return;
    if (!confirm(`Excluir ${relogio.marca} ${relogio.modelo}? Esta ação não pode ser desfeita.`)) return;

    setExcluindo(true);
    const res = await fetch(`/api/relogios/${relogio.id}`, { method: "DELETE" });
    setExcluindo(false);

    if (!res.ok) {
      setErro("Não foi possível excluir.");
      return;
    }

    router.push("/admin/relogios");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <UploadFotos fotos={fotos} onChange={setFotos} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Campo label="Marca" value={marca} onChange={setMarca} required />
        <Campo label="Modelo" value={modelo} onChange={setModelo} required />
        <Campo label="Referência" value={referencia} onChange={setReferencia} required />
        <Campo label="Preço (R$)" value={preco} onChange={setPreco} type="number" required />

        <div>
          <label className="text-sm uppercase tracking-wide text-neutral-500">Condição</label>
          <select
            value={condicao}
            onChange={(e) => setCondicao(e.target.value as typeof condicao)}
            className="mt-1 w-full rounded border border-neutral-300 px-3 py-2"
          >
            <option value="NOVO">Novo</option>
            <option value="SEMINOVO">Seminovo</option>
          </select>
        </div>

        <div>
          <label className="text-sm uppercase tracking-wide text-neutral-500">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as typeof status)}
            className="mt-1 w-full rounded border border-neutral-300 px-3 py-2"
          >
            <option value="DISPONIVEL">Disponível</option>
            <option value="RESERVADO">Reservado</option>
            <option value="VENDIDO">Vendido</option>
          </select>
        </div>

        <Campo label="Diâmetro da caixa" value={diametroCaixa ?? ""} onChange={setDiametroCaixa} />
        <Campo label="Movimento" value={movimento ?? ""} onChange={setMovimento} />
        <Campo label="Pulseira" value={pulseira ?? ""} onChange={setPulseira} />
        <Campo label="Vidro" value={vidro ?? ""} onChange={setVidro} />
        <Campo label="Material da caixa" value={materialCaixa ?? ""} onChange={setMaterialCaixa} />
        <Campo label="Ano / Estado" value={anoEstado ?? ""} onChange={setAnoEstado} />
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={feminino} onChange={(e) => setFeminino(e.target.checked)} />
          Feminino
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={destaque} onChange={(e) => setDestaque(e.target.checked)} />
          Destaque
        </label>
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
            {excluindo ? "Excluindo..." : "Excluir relógio"}
          </button>
        )}
      </div>
    </form>
  );
}

function Campo({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-sm uppercase tracking-wide text-neutral-500">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        step={type === "number" ? "0.01" : undefined}
        className="mt-1 w-full rounded border border-neutral-300 px-3 py-2"
      />
    </div>
  );
}
