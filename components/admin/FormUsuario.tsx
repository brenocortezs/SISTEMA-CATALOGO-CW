"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function FormUsuario() {
  const router = useRouter();

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setSalvando(true);

    const res = await fetch("/api/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario, senha }),
    });

    setSalvando(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setErro(
        res.status === 409
          ? "Já existe um usuário com esse nome."
          : "Não foi possível criar o usuário. Confira os campos."
      );
      console.error(data);
      return;
    }

    router.push("/admin/usuarios");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="text-sm uppercase tracking-wide text-neutral-500">Usuário</label>
        <input
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
          minLength={3}
          className="mt-1 w-full rounded border border-neutral-300 px-3 py-2"
        />
      </div>

      <div>
        <label className="text-sm uppercase tracking-wide text-neutral-500">Senha</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          minLength={6}
          className="mt-1 w-full rounded border border-neutral-300 px-3 py-2"
        />
        <p className="mt-1 text-xs text-neutral-500">Mínimo de 6 caracteres.</p>
      </div>

      <p className="text-xs text-neutral-500">
        O novo colaborador terá acesso ao painel administrativo (relógios, acessórios e
        depoimentos), mas não poderá gerenciar outros usuários.
      </p>

      {erro && <p className="text-sm text-red-600">{erro}</p>}

      <div>
        <button
          type="submit"
          disabled={salvando}
          className="rounded-full bg-black px-6 py-3 text-sm font-medium uppercase tracking-wide text-white hover:bg-neutral-800 disabled:opacity-50"
        >
          {salvando ? "Criando..." : "Criar colaborador"}
        </button>
      </div>
    </form>
  );
}
