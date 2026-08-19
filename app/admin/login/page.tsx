"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/shared/Logo";

export default function AdminLoginPage() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario, senha }),
    });

    setCarregando(false);

    if (!res.ok) {
      setErro("Usuário ou senha inválidos.");
      return;
    }

    // Navegação completa (não router.push) para evitar que o Router Cache do Next
    // reutilize uma resposta anterior sem o cookie de sessão recém-criado.
    // eslint-disable-next-line @next/next/no-location-assign-relative-destination
    window.location.href = "/admin";
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-paper px-4">
      <Logo size="md" tone="dark" href="/catalogo" />

      <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-4">
        <div>
          <label className="text-xs uppercase tracking-[0.08em] text-muted">Usuário</label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
            className="mt-1 w-full border border-hairline bg-paper px-4 py-3 text-ink outline-none focus:border-ink"
          />
        </div>

        <div>
          <label className="text-xs uppercase tracking-[0.08em] text-muted">Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className="mt-1 w-full border border-hairline bg-paper px-4 py-3 text-ink outline-none focus:border-ink"
          />
        </div>

        {erro && <p className="text-sm text-red-600">{erro}</p>}

        <button
          type="submit"
          disabled={carregando}
          className="mt-2 bg-ink px-6 py-3 text-xs font-medium uppercase tracking-[0.1em] text-paper hover:opacity-80 disabled:opacity-50"
        >
          {carregando ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <Link href="/catalogo" className="text-xs uppercase tracking-[0.08em] text-muted hover:text-ink">
        ← Voltar ao site
      </Link>
    </div>
  );
}
