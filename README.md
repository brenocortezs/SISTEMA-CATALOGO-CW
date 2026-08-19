# Concept Watch

Site + painel administrativo da Concept Watch: página de bio, catálogo de relógios e
acessórios, e área de admin para cadastrar/editar os itens. Fechamento de venda sempre
via WhatsApp — não há carrinho nem checkout.

Stack: Next.js (App Router) + TypeScript, Tailwind CSS, Supabase (Postgres + `@supabase/supabase-js`),
upload de imagens via Supabase Storage, autenticação multiusuário (usuários/senhas com hash na
tabela `Usuario`, dois papéis: Admin Máximo e Colaborador).

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
2. Crie as tabelas `Relogio`, `FotoRelogio`, `Acessorio`, `FotoAcessorio`, `Depoimento` e
   `Usuario` (com os enums `Condicao`, `StatusRelogio`, `StatusAcessorio`, `TipoAcessorio`,
   `PapelUsuario`) pelo SQL Editor do Supabase — veja o formato das colunas em
   `lib/database.types.ts`.
3. Habilite RLS nas 6 tabelas (recomendado, já que o app não usa a API pública/anon key):
   ```sql
   ALTER TABLE public."Relogio" ENABLE ROW LEVEL SECURITY;
   ALTER TABLE public."FotoRelogio" ENABLE ROW LEVEL SECURITY;
   ALTER TABLE public."Acessorio" ENABLE ROW LEVEL SECURITY;
   ALTER TABLE public."FotoAcessorio" ENABLE ROW LEVEL SECURITY;
   ALTER TABLE public."Depoimento" ENABLE ROW LEVEL SECURITY;
   ALTER TABLE public."Usuario" ENABLE ROW LEVEL SECURITY;
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

## 5. Usuários do admin

Login e senha de cada pessoa ficam na tabela `Usuario` (senha sempre com hash, nunca em
texto puro). Existem dois papéis:

- **Admin Máximo** (`SUPER_ADMIN`) — você. Só pode existir um; não pode ser removido nem
  rebaixado por ninguém (nem por outro Admin Máximo, porque só um é criado manualmente
  por SQL — veja abaixo). É o único papel que enxerga a aba **Usuários** no admin.
- **Colaborador** (`ADMIN`) — acesso normal ao painel (relógios, acessórios, depoimentos),
  sem acesso à gestão de usuários. Criado e removido pelo Admin Máximo em `/admin/usuarios`.

Para trocar sua própria senha (ou a de qualquer usuário logado), use **Minha conta** no
menu do admin — não precisa mexer em código nem redeploy.

Para criar a sua conta de Admin Máximo pela primeira vez (depois de criar a tabela
`Usuario`), rode no SQL Editor do Supabase — troque o hash pelo gerado com
`node -e "console.log(require('bcryptjs').hashSync('SUA_SENHA', 12))"`:

```sql
insert into public."Usuario" (id, usuario, "senhaHash", papel)
values (gen_random_uuid()::text, 'seu_usuario', 'HASH_GERADO_ACIMA', 'SUPER_ADMIN');
```

Troque `SESSION_SECRET` por uma string aleatória longa (ex: gerada com
`openssl rand -hex 32`) antes de ir para produção — ela assina o cookie de sessão.

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
