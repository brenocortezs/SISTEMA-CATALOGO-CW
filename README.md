# Concept Watch

Site + painel administrativo da Concept Watch: página de bio, catálogo de relógios e
acessórios, e área de admin para cadastrar/editar os itens. Fechamento de venda sempre
via WhatsApp — não há carrinho nem checkout.

Stack: Next.js (App Router) + TypeScript, Tailwind CSS, Supabase (Postgres + `@supabase/supabase-js`),
upload de imagens via Supabase Storage, autenticação simples (usuário/senha único em variáveis
de ambiente).

## Rodando localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000). A página `/` é a bio; o catálogo fica
em `/catalogo`; o admin em `/admin`.

O acesso ao banco é feito 100% pelo servidor (Server Components e API routes) usando o
client `@supabase/supabase-js` com a `service_role key`, que ignora Row Level Security —
não há chamadas ao Supabase pelo navegador.

## 1. Criar o banco no Supabase

1. Crie um projeto gratuito em [supabase.com](https://supabase.com).
2. Crie as tabelas `Relogio`, `FotoRelogio`, `Acessorio`, `FotoAcessorio` e `Depoimento`
   (com os enums `Condicao`, `StatusRelogio`, `StatusAcessorio`, `TipoAcessorio`) pelo
   SQL Editor do Supabase — veja o formato das colunas em `lib/database.types.ts`.
3. Habilite RLS nas 5 tabelas (recomendado, já que o app não usa a API pública/anon key):
   ```sql
   ALTER TABLE public."Relogio" ENABLE ROW LEVEL SECURITY;
   ALTER TABLE public."FotoRelogio" ENABLE ROW LEVEL SECURITY;
   ALTER TABLE public."Acessorio" ENABLE ROW LEVEL SECURITY;
   ALTER TABLE public."FotoAcessorio" ENABLE ROW LEVEL SECURITY;
   ALTER TABLE public."Depoimento" ENABLE ROW LEVEL SECURITY;
   ```
4. Em **Project Settings → API**, copie a **Project URL** (`SUPABASE_URL`) e a chave
   **service_role** (secret) → `SUPABASE_SERVICE_ROLE_KEY`. Cole no `.env`, seguindo o
   formato de `.env.example`. **Nunca** exponha a service_role key com prefixo
   `NEXT_PUBLIC_` — ela ignora RLS e dá acesso total ao banco.

## 2. Popular com dados de exemplo (opcional)

```bash
npm run seed   # popula com 2 relógios, 1 acessório e 1 depoimento de exemplo
```

## 3. Upload de imagens (Supabase Storage)

As fotos são enviadas para o bucket público `fotos` no seu projeto Supabase (criado via SQL,
`insert into storage.buckets (id, name, public) values ('fotos', 'fotos', true)`). O upload
e a remoção de arquivos usam a `service_role key` no servidor ([lib/storage.ts](lib/storage.ts)),
então não é preciso nenhuma variável de ambiente extra além das do passo 1 — se
`SUPABASE_URL`/`SUPABASE_SERVICE_ROLE_KEY` estiverem configuradas, o upload já funciona.

## 4. Deploy na Vercel

1. Suba o projeto para um repositório Git e importe na Vercel (ou rode `vercel --prod` pela CLI).
2. Configure todas as variáveis de `.env.example` nas Environment Variables do projeto
   (Production e Preview).
3. Não é preciso rodar migrations — o schema já vive só no Supabase. Rode `npm run seed`
   localmente (com o `.env` apontando pro Supabase) se quiser popular com dados de exemplo.

## 5. Trocar o usuário/senha do admin

As credenciais ficam nas variáveis `ADMIN_USERNAME` e `ADMIN_PASSWORD`. Para trocar:

- **Local**: edite o arquivo `.env`.
- **Produção**: edite as Environment Variables do projeto na Vercel e faça um redeploy
  (Settings → Environment Variables → editar → Deployments → Redeploy). Não precisa mexer em código.

Troque também `SESSION_SECRET` por uma string aleatória longa (ex: gerada com
`openssl rand -hex 32`) antes de ir para produção.

## Variáveis de ambiente

Veja `.env.example` para a lista completa (Supabase, credenciais do admin,
número de WhatsApp, link do Instagram, link do Grupo VIP).

## Estrutura

- `app/` — rotas (bio, catálogo, admin, API)
- `components/` — componentes React, organizados por área (`catalogo/`, `admin/`, `shared/`, `bio/`)
- `lib/` — client do Supabase, tipos gerados do banco, autenticação, validações (zod), helpers
- `scripts/seed.ts` — popula o banco com dados de exemplo

## Pendências para você preencher

- **Logo**: o projeto usa um monograma placeholder gerado por código
  ([components/shared/Logo.tsx](components/shared/Logo.tsx)). Substitua pelo arquivo de
  logo real quando quiser (ex: trocando o SVG inline por uma imagem em `/public`).
- **Instagram**: defina a URL real em `NEXT_PUBLIC_INSTAGRAM_URL`.
