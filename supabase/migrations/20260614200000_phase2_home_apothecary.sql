create extension if not exists pgcrypto;

create schema if not exists private;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  has_access boolean not null default true,
  activated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.remedies (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  name_latin text not null,
  category text not null,
  summary text not null,
  traditional_use text not null,
  preparation_steps jsonb not null default '[]'::jsonb,
  ingredients text[] not null default '{}'::text[],
  symptoms text[] not null default '{}'::text[],
  dosage_note text not null,
  contraindications text[] not null default '{}'::text[],
  interactions text[] not null default '{}'::text[],
  pregnancy_warning boolean not null default false,
  pregnancy_warning_text text not null,
  allergy_note text not null,
  sources text[] not null default '{}'::text[],
  is_teaser boolean not null default false,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists remedies_category_idx on public.remedies (category);
create index if not exists remedies_is_teaser_idx on public.remedies (is_teaser);
create index if not exists remedies_published_at_idx on public.remedies (published_at desc);

alter table public.profiles enable row level security;
alter table public.remedies enable row level security;

create or replace function private.touch_updated_at()
returns trigger
language plpgsql
security definer
set search_path = public, private
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists touch_profiles_updated_at on public.profiles;
create trigger touch_profiles_updated_at
before update on public.profiles
for each row execute function private.touch_updated_at();

drop trigger if exists touch_remedies_updated_at on public.remedies;
create trigger touch_remedies_updated_at
before update on public.remedies
for each row execute function private.touch_updated_at();

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public, private, auth
as $$
begin
  insert into public.profiles (id, email, has_access, activated_at)
  values (new.id, coalesce(new.email, ''), true, now())
  on conflict (id) do update
    set email = excluded.email,
        updated_at = now();

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function private.handle_new_user();

create or replace function private.current_user_has_access()
returns boolean
language sql
stable
security definer
set search_path = public, private
as $$
  select coalesce(
    (select p.has_access from public.profiles p where p.id = auth.uid()),
    false
  );
$$;

grant usage on schema private to anon, authenticated;
grant execute on function private.current_user_has_access() to anon, authenticated;

grant select on public.remedies to anon, authenticated;
grant select, update on public.profiles to authenticated;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using (id = auth.uid());

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles
for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

drop policy if exists "remedies_select_access" on public.remedies;
create policy "remedies_select_access"
on public.remedies
for select
to anon, authenticated
using (is_teaser or private.current_user_has_access());

