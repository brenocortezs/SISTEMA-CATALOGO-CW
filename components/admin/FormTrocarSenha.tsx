"use client";

import { useState } from "react";

export function FormTrocarSenha() {
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmacao, setConfirmacao] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setSucesso(false);

    if (novaSenha !== confirmacao) {
      setErro("A confirmação não coincide com a nova senha.");
      return;
    }

    setSalvando(true);
    const res = await fetch("/api/auth/trocar-senha", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ senhaAtual, novaSenha }),
    });
    setSalvando(false);

    if (!res.ok) {
      setErro(res.status === 401 ? "Senha atual incorreta." : "Não foi possível trocar a senha.");
      return;
    }

    setSenhaAtual("");
    setNovaSenha("");
    setConfirmacao("");
    setSucesso(true);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="text-sm uppercase tracking-wide text-neutral-500">Senha atual</label>
        <input
          type="password"
          value={senhaAtual}
          onChange={(e) => setSenhaAtual(e.target.value)}
          required
          className="mt-1 w-full rounded border border-neutral-300 px-3 py-2"
        />
      </div>

      <div>
        <label className="text-sm uppercase tracking-wide text-neutral-500">Nova senha</label>
        <input
          type="password"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
          required
          minLength={6}
          className="mt-1 w-full rounded border border-neutral-300 px-3 py-2"
        />
      </div>

      <div>
        <label className="text-sm uppercase tracking-wide text-neutral-500">Confirmar nova senha</label>
        <input
          type="password"
          value={confirmacao}
          onChange={(e) => setConfirmacao(e.target.value)}
          required
          minLength={6}
          className="mt-1 w-full rounded border border-neutral-300 px-3 py-2"
        />
      </div>

      {erro && <p className="text-sm text-red-600">{erro}</p>}
      {sucesso && <p className="text-sm text-green-700">Senha alterada com sucesso.</p>}

      <div>
        <button
          type="submit"
          disabled={salvando}
          className="rounded-full bg-black px-6 py-3 text-sm font-medium uppercase tracking-wide text-white hover:bg-neutral-800 disabled:opacity-50"
        >
          {salvando ? "Salvando..." : "Trocar senha"}
        </button>
      </div>
    </form>
  );
}
