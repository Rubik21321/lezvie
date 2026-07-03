-- Таблица заявок на запись
create table if not exists public.bookings (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  service text not null,
  master text not null default 'Любой мастер',
  date date not null,
  time text not null,
  status text not null default 'new' -- new | confirmed | done | cancelled
);

-- RLS включён, политик нет: с anon-ключом таблица недоступна,
-- пишет только Edge Function через service role.
alter table public.bookings enable row level security;
