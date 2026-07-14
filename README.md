# QR Pro — Micro-SaaS de Geração de QR Codes

> Protótipo funcional de uma arquitetura SaaS completa: autenticação, billing com Stripe, RLS multi-tenant e feature gating por plano. Construído com AI-assisted programming para validar o ciclo end-to-end de um produto de assinatura.

🔗 **Demo:** [instant-scan-forge.lovable.app](https://instant-scan-forge.lovable.app)

---

## Sobre o projeto

**QR Pro** é um projeto pessoal cujo objetivo foi exercitar, de ponta a ponta, a arquitetura de um micro-SaaS real — não apenas o gerador em si. A superfície visível é um gerador de QR codes; a parte interessante é o que está por trás: autenticação, isolamento de dados por usuário via Row Level Security, tiers de assinatura com gating de features e integração com Stripe para checkout.

Construí este projeto para praticar, num escopo pequeno e controlado, os mesmos padrões de multi-tenancy, RLS e billing que aplico no **Sistema Monitore** (produto principal). Aqui a superfície é intencionalmente commodity (gerador de QR) justamente para deixar a arquitetura em evidência.

Este repositório é um **protótipo de arquitetura**, não um produto validado no mercado. Não há métricas de uso, usuários pagantes ou tração comercial associadas.

## O que foi construído

### Camada de produto (gerador)
- Geração de QR code em tempo real com debounce
- Personalização: tamanho, margem, cores, nível de correção de erro (L/M/Q/H)
- Exportação em PNG e SVG, cópia direta para a área de transferência
- Persistência local das preferências do usuário

### Camada de SaaS (o que este projeto exercita)
- **Auth:** email/senha + Google OAuth
- **Multi-tenant com RLS:** cada usuário só enxerga os próprios QR codes e scans, garantido no banco via políticas de Row Level Security
- **Feature gating por plano:** recursos como QR dinâmico, analytics e logo custom são gated por tier
- **Billing:** integração com Stripe para checkout dos planos Pro e Business
- **Dashboard autenticado:** histórico de QR codes, contagem de scans, gestão de links dinâmicos

## Planos (modelo de precificação exercitado)

| Plano | Preço | Escopo |
|-------|-------|--------|
| Gratuito | R$ 0/mês | Uso pessoal — QR estáticos, PNG/SVG |
| Pro | R$ 29/mês | QR dinâmicos, logo, analytics básico, histórico |
| Business | R$ 79/mês | Analytics avançado, API, geração em lote |

Os preços refletem o modelo desenhado; não indicam base de clientes.

## Stack técnica

- **Frontend:** React 18 + Vite 5 + TypeScript 5
- **UI:** Tailwind CSS + shadcn/ui
- **Backend:** Lovable Cloud (Auth, Postgres, Edge Functions, RLS)
- **Pagamentos:** Stripe
- **Autenticação:** Email/senha + Google OAuth
- **QR:** biblioteca `qrcode`

## Modelo de dados (resumo)

- `qr_codes` — QR codes por usuário, com flag `is_dynamic`, `short_code`, `scan_count`, RLS por `user_id`
- `qr_scans` — eventos de scan associados a um `qr_code_id`, INSERT restrito a QR codes ativos, SELECT restrito ao dono

Row Level Security está habilitada em todas as tabelas públicas; nenhuma política usa `WITH CHECK (true)` para escrita.

## Rodando localmente

Pré-requisitos: **Node.js** e **npm** ([instalar via nvm](https://github.com/nvm-sh/nvm#installing-and-updating)).

```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm i
npm run dev
```

App disponível em `http://localhost:8080`.

## Estrutura

```
src/
├── components/     # QRGenerator + componentes UI (shadcn)
├── pages/          # Landing, Auth, Dashboard, Index
├── hooks/          # useAuth, useDebounce
├── integrations/   # Cliente do backend (Lovable Cloud)
└── index.css       # Design system (tokens semânticos)
```

## Notas de transparência

- Construído com **AI-assisted programming** via Lovable — o objetivo era validar arquitetura e iterar rápido, não escrever cada linha manualmente.
- Sem usuários reais nem receita. Trate como portfolio/protótipo.
- Emails aparecendo em capturas de tela são contas de teste descartáveis.

---

© 2026 QR Pro — projeto de portfolio.
