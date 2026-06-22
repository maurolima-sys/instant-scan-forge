Objetivo: permitir que usuários façam login/cadastro com Google no app de gerador de QR Codes, mantendo o fluxo atual de email/senha.

O que será feito:
1. Configurar o provedor Google no Lovable Cloud (`supabase--configure_social_auth`).
2. Gerar/instalar o módulo de integração Lovable (`src/integrations/lovable/index.ts` e pacote `@lovable.dev/cloud-auth-js`).
3. Expôr uma função `signInWithGoogle()` no hook `useAuth.tsx` usando `lovable.auth.signInWithOAuth("google")`.
4. Adicionar um botão "Continuar com Google" na página `src/pages/Auth.tsx`, com separador visual entre login social e login por email/senha.
5. Garantir redirecionamento para `/dashboard` após login bem-sucedido (já funciona via listener do Supabase em `useAuth`).

Detalhes técnicos:
- A ferramenta `supabase--configure_social_auth` cria automaticamente as credenciais OAuth gerenciadas pelo Lovable Cloud; não é necessário criar client ID/secret manualmente.
- O fluxo OAuth será iniciado com:
  ```ts
  const result = await lovable.auth.signInWithOAuth("google", {
    redirect_uri: window.location.origin,
  });
  if (result.error) { /* mostrar toast */ }
  if (result.redirected) { return; }
  ```
- O botão do Google usará um ícone/logo simples e estará posicionado acima do formulário de email/senha, separado por um divisor "ou".
- Não será necessário alterar tabelas do banco de dados (sem perfil de usuário, conforme decisão anterior).
- O email continuará disponível como método alternativo.

Resultado esperado: tela de autenticação com opção "Continuar com Google" funcional, redirecionando usuários logados para o Dashboard.