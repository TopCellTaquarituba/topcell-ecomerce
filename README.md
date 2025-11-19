# TopCell Ecommerce

Aplicação full stack desenvolvida para a TopCell — loja de eletrônicos localizada em Taquarituba/SP. O projeto foi construído com Next.js (App Router), Prisma + Neon/Postgres e o design system do shadcn/ui para entregar uma experiência minimalista e responsiva.

## Principais recursos

- **Loja completa**: home com destaques, categorias, banners e vitrines; listagem de produtos, página de detalhes, carrinho, checkout e login.
- **Painel administrativo**: gerenciamento de produtos, categorias, listas de preço, integrações externas e textos institucionais do site.
- **Checkout rápido**: pedidos são registrados via API `/api/orders` e ficam disponíveis no dashboard.
- **Integração pronta para Neon + Prisma**: schema completo, seed com catálogo inicial, usuários e integrações fictícias.
- **Arquitetura moderna**: App Router, componentes shadcn, Zustand para carrinho com persistência, formulários em React Hook Form + Zod, middleware de proteção e autenticação com JWT simples.

## Tecnologias

- [Next.js 16 (App Router)](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4 + shadcn/ui](https://ui.shadcn.com/)
- [Prisma ORM](https://www.prisma.io/) + [Neon](https://neon.tech/)
- [Zod](https://zod.dev/) e [React Hook Form](https://react-hook-form.com/)
- [Zustand](https://github.com/pmndrs/zustand) para o estado do carrinho

## Requisitos

- Node.js 18+
- Conta/PostgreSQL no [Neon](https://neon.tech/) ou qualquer instância compatível

## Configuração

1. Copie o arquivo de variáveis:

   ```bash
   cp .env.example .env
   ```

   Preencha:

   - `DATABASE_URL`: string de conexão do seu banco Neon/Postgres (usar `sslmode=require`).
   - `AUTH_SECRET`: segredo para assinar o JWT de sessão.
   - `NEXT_PUBLIC_SITE_URL`: URL da aplicação.

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Execute as migrações/seed:

   ```bash
   npm run prisma:generate
   npm run db:push        # ou npm run db:migrate se preferir migrations
   npm run db:seed
   ```

   O seed cria catálogo inicial, banners e um usuário administrador:

   - **Email**: `admin@topcell.com.br`
   - **Senha**: `topcell123`

4. Rode a aplicação:

   ```bash
   npm run dev
   ```

   Acesse [http://localhost:3000](http://localhost:3000).

## Scripts úteis

| Comando              | Descrição                                    |
| -------------------- | -------------------------------------------- |
| `npm run dev`        | Inicia o servidor Next.js em modo desenvolvimento |
| `npm run build`      | Build de produção                             |
| `npm run lint`       | Executa o ESLint                             |
| `npm run prisma:generate` | Gera o client Prisma                    |
| `npm run db:push`    | Atualiza o schema no banco (Prisma db push)  |
| `npm run db:seed`    | Popula o banco com dados iniciais            |

## Estrutura resumida

- `src/app/(store)`: páginas públicas (home, produtos, carrinho, checkout, login).
- `src/app/admin`: dashboard administrativo protegido por middleware.
- `src/app/api`: APIs REST (produtos, categorias, pedidos, integrações, auth).
- `src/components`: UI compartilhada, formulários, tabelas e layout.
- `src/lib`: Prisma Client, utilitários, validações e helpers de sessão.
- `prisma/schema.prisma`: schema completo com produtos, listas de preço, site settings, integrações e pedidos.

## Próximos passos sugeridos

- Configurar Next.js Route Handlers com autenticação de dois fatores ou NextAuth para multiusuários.
- Ligar as integrações configuradas no painel a serviços reais (pagamentos, logística, webhooks etc.).
- Implementar revisão de pedidos, e-mails transacionais e dashboards avançados.

---

Feito com 💙 para a TopCell — tecnologia, bebidas e eletrodomésticos no coração de Taquarituba/SP.
