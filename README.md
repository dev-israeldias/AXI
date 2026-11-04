# AXIS — Engineering & Interactive

## Passo a passo
1. **Supabase** (plano free): crie um projeto → SQL Editor → cole e rode `supabase/schema.sql`.
2. Authentication → Users → *Add user* com seu e-mail/senha. Em Authentication → Providers → Email, **desative "Allow new users to sign up"** (só você entra).
3. No SQL Editor: `insert into admins (email) values ('seu@email.com');`
4. Copie `.env.example` para `.env.local` e preencha URL, anon key (Settings → API) e o WhatsApp.
5. `npm install && npm run dev` → abra `/login`, entre e edite em `/admin`.
6. **Vercel** (Hobby): suba para o GitHub, importe o repositório e cadastre as 3 variáveis de ambiente.

## Como respeita os limites free
- Home pública é estática (ISR 1h) e sem cookies: quase nenhuma leitura no Supabase por visita.
- Imagens são comprimidas no navegador (WebP, ≤ 850 KB) antes do upload; Storage free tem 1 GB.
- Sem serviços extras (nada de e-mail, cron ou funções pesadas). Fontes via next/font (self-hosted).
- Atenção: projetos Supabase free são pausados após ~7 dias sem atividade; basta reativar no painel.
