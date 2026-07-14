# QR Pro — Gerador de QR Codes Profissional

> A ferramenta #1 de QR Codes no Brasil. Crie, personalize e rastreie QR codes dinâmicos com analytics em tempo real.

🔗 **Live:** [instant-scan-forge.lovable.app](https://instant-scan-forge.lovable.app)

---

## ✨ Sobre o projeto

**QR Pro** é uma plataforma SaaS completa para geração e gerenciamento de QR Codes, voltada para profissionais e empresas que precisam de mais do que um simples gerador. Além de criar QR codes personalizados em segundos, oferece recursos avançados como códigos dinâmicos, analytics de escaneamento e histórico centralizado.

## 🚀 Funcionalidades

### Gerador (grátis, sem cadastro)
- ⚡ **Geração instantânea** — QR code criado em tempo real conforme você digita
- 🎨 **Personalização completa** — tamanho, margem, cores (escura/clara) e nível de correção de erro (L, M, Q, H)
- 📥 **Exportação em PNG e SVG** com nome de arquivo customizável
- 📋 **Copiar imagem** direto para a área de transferência
- 💾 **Persistência local** — suas preferências ficam salvas no navegador

### Recursos Pro (usuários autenticados)
- 🔄 **QR Codes Dinâmicos** — edite o destino sem reimprimir
- 📊 **Analytics Detalhado** — escaneamentos, localização e dispositivos em tempo real
- 🖼️ **Logo Personalizado** — insira sua marca no centro do QR code
- 🗂️ **Histórico Completo** — gerencie todos os seus QR codes em um painel
- 🛡️ **Alta Confiabilidade** — correção de erro avançada

## 💳 Planos

| Plano | Preço | Ideal para |
|-------|-------|------------|
| **Gratuito** | R$ 0/mês | Uso pessoal — 5 QR codes estáticos/mês, PNG/SVG, sem marca d'água |
| **Pro** ⭐ | R$ 29/mês | Profissionais — QR codes ilimitados, dinâmicos, logo, analytics básico, histórico |
| **Business** | R$ 79/mês | Empresas — Analytics avançado, API, geração em lote, suporte prioritário, domínio próprio |

## 🛠️ Stack técnica

- **Frontend:** React 18 + Vite 5 + TypeScript 5
- **UI:** Tailwind CSS + shadcn/ui
- **Backend:** Lovable Cloud (Auth, Database, Edge Functions, RLS)
- **Pagamentos:** Stripe
- **Autenticação:** Email/senha + Google OAuth
- **Geração de QR:** biblioteca `qrcode`

## 🏁 Começando localmente

Pré-requisitos: **Node.js** e **npm** ([instalar com nvm](https://github.com/nvm-sh/nvm#installing-and-updating)).

```sh
# 1. Clone o repositório
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# 2. Instale as dependências
npm i

# 3. Rode o servidor de desenvolvimento
npm run dev
```

O app estará disponível em `http://localhost:8080`.

## 📂 Estrutura principal

```
src/
├── components/     # QRGenerator e componentes UI (shadcn)
├── pages/          # Landing, Auth, Dashboard, Index
├── hooks/          # useAuth, useDebounce
├── integrations/   # Cliente do backend (Lovable Cloud)
└── index.css       # Design system (tokens semânticos)
```

## 🌐 Editando o projeto

**Via Lovable** — visite o [Projeto Lovable](https://lovable.dev/projects/e19b96a7-5a9f-4900-b67e-59d92469fa5c) e comece a prompt.

**Via IDE local** — clone, edite e faça push; as mudanças sincronizam com o Lovable automaticamente.

**Via GitHub** — edite arquivos direto pelo navegador ou use GitHub Codespaces.

## 🚢 Deploy

Abra o [Lovable](https://lovable.dev/projects/e19b96a7-5a9f-4900-b67e-59d92469fa5c) e clique em **Share → Publish**.

Para conectar um domínio personalizado, vá em **Project → Settings → Domains → Connect Domain**. [Guia completo](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide).

---

© 2026 QR Pro. Todos os direitos reservados.
