-- Rode no SQL Editor do Supabase (uma vez)
create table if not exists site_content (
  key text primary key,
  value text not null,
  updated_at timestamptz default now()
);
create table if not exists admins (email text primary key);

alter table site_content enable row level security;
alter table admins enable row level security;

create policy "leitura publica" on site_content for select using (true);
create policy "admin escreve" on site_content for all to authenticated
  using (exists (select 1 from admins a where a.email = auth.jwt() ->> 'email'))
  with check (exists (select 1 from admins a where a.email = auth.jwt() ->> 'email'));
create policy "admin le a si mesmo" on admins for select to authenticated
  using (email = auth.jwt() ->> 'email');

insert into storage.buckets (id, name, public) values ('site-images', 'site-images', true)
  on conflict (id) do nothing;
create policy "imagens publicas" on storage.objects for select using (bucket_id = 'site-images');
create policy "admin sobe imagens" on storage.objects for all to authenticated
  using (bucket_id = 'site-images' and exists (select 1 from admins a where a.email = auth.jwt() ->> 'email'))
  with check (bucket_id = 'site-images' and exists (select 1 from admins a where a.email = auth.jwt() ->> 'email'));

-- Depois de criar seu usuário em Authentication > Users, cadastre o e-mail como admin:
-- insert into admins (email) values ('seu@email.com');
