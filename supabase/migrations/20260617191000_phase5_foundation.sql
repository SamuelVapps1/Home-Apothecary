create extension if not exists pgcrypto;

do $$
begin
  create type public.tier as enum ('free', 'standard', 'premium');
exception
  when duplicate_object then null;
end
$$;

alter table if exists public.profiles
  add column if not exists access_level public.tier;

alter table if exists public.license_keys
  add column if not exists tier public.tier;

create table if not exists public.plants (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  common_name text not null,
  name_latin text not null,
  family text not null,
  parts_used text[] not null default '{}'::text[],
  contraindications text[] not null default '{}'::text[],
  interactions text[] not null default '{}'::text[],
  pregnancy_warning_text text not null default '',
  allergy_note text not null default '',
  sources text[] not null default '{}'::text[],
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.recipes (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null,
  summary text not null,
  preparation_type text not null check (
    preparation_type in (
      'infusion',
      'decoction',
      'tincture',
      'salve',
      'extract',
      'oil',
      'syrup',
      'powder',
      'other'
    )
  ),
  traditional_use text not null,
  method_steps jsonb not null default '[]'::jsonb,
  dosage_note text not null,
  safety_notes text[] not null default '{}'::text[],
  sources text[] not null default '{}'::text[],
  is_free boolean not null default false,
  required_tier public.tier not null default 'standard',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint recipes_free_tier_consistency check (
    (is_free and required_tier = 'free') or (not is_free and required_tier in ('standard', 'premium'))
  )
);

create table if not exists public.recipe_components (
  id uuid primary key default gen_random_uuid(),
  recipe_id uuid not null references public.recipes (id) on delete cascade,
  plant_id uuid not null references public.plants (id) on delete restrict,
  part_used text not null,
  ratio_quantity text not null,
  temperature text,
  time text,
  prep_notes text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint recipe_components_recipe_order_key unique (recipe_id, sort_order),
  constraint recipe_components_recipe_plant_key unique (recipe_id, plant_id, part_used)
);

create index if not exists plants_slug_idx on public.plants (slug);
create index if not exists plants_common_name_idx on public.plants (common_name);
create index if not exists recipes_category_idx on public.recipes (category);
create index if not exists recipes_is_free_idx on public.recipes (is_free);
create index if not exists recipes_required_tier_idx on public.recipes (required_tier);
create index if not exists recipes_slug_idx on public.recipes (slug);
create index if not exists recipe_components_recipe_id_idx on public.recipe_components (recipe_id, sort_order);
create index if not exists recipe_components_plant_id_idx on public.recipe_components (plant_id);

alter table public.plants enable row level security;
alter table public.recipes enable row level security;
alter table public.recipe_components enable row level security;

do $$
begin
  update public.profiles
  set access_level = case when has_access then 'standard'::public.tier else 'free'::public.tier end
  where access_level is null;
exception
  when undefined_table then null;
end
$$;

do $$
begin
  update public.license_keys
  set tier = coalesce(tier, 'standard'::public.tier)
  where tier is null;
exception
  when undefined_table then null;
end
$$;

alter table if exists public.profiles
  alter column access_level set default 'free'::public.tier,
  alter column access_level set not null;

alter table if exists public.license_keys
  alter column tier set default 'standard'::public.tier,
  alter column tier set not null;

drop trigger if exists touch_plants_updated_at on public.plants;
create trigger touch_plants_updated_at
before update on public.plants
for each row execute function private.touch_updated_at();

drop trigger if exists touch_recipes_updated_at on public.recipes;
create trigger touch_recipes_updated_at
before update on public.recipes
for each row execute function private.touch_updated_at();

drop trigger if exists touch_recipe_components_updated_at on public.recipe_components;
create trigger touch_recipe_components_updated_at
before update on public.recipe_components
for each row execute function private.touch_updated_at();

create or replace function private.current_user_access_level()
returns public.tier
language sql
stable
security definer
set search_path = public, private
as $$
  select coalesce(
    (select p.access_level from public.profiles p where p.id = auth.uid()),
    'free'::public.tier
  );
$$;

create or replace function private.current_user_can_access(p_required_tier public.tier)
returns boolean
language sql
stable
security definer
set search_path = public, private
as $$
  select private.current_user_access_level() >= p_required_tier;
$$;

create or replace function private.current_user_has_access()
returns boolean
language sql
stable
security definer
set search_path = public, private
as $$
  select private.current_user_access_level() <> 'free'::public.tier;
$$;

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public, private, auth
as $$
begin
  insert into public.profiles (id, email, has_access, access_level, activated_at)
  values (new.id, coalesce(new.email, ''), false, 'free'::public.tier, now())
  on conflict (id) do update
    set email = excluded.email,
        updated_at = now();

  return new;
end;
$$;

create or replace function private.redeem_license_key(
  p_key text,
  p_user_id uuid
)
returns boolean
language plpgsql
security definer
set search_path = public, private
as $$
declare
  v_license public.license_keys%rowtype;
begin
  select *
  into v_license
  from public.license_keys
  where key = p_key
  for update;

  if not found then
    raise exception 'invalid_license_key';
  end if;

  if v_license.status <> 'valid' then
    raise exception 'license_key_already_redeemed';
  end if;

  update public.license_keys
  set status = 'redeemed',
      redeemed_by = p_user_id,
      redeemed_at = now(),
      updated_at = now()
  where key = p_key
    and status = 'valid';

  if not found then
    raise exception 'license_key_already_redeemed';
  end if;

  update public.profiles
  set has_access = v_license.tier <> 'free'::public.tier,
      access_level = v_license.tier,
      activated_at = now(),
      updated_at = now()
  where id = p_user_id;

  if not found then
    raise exception 'profile_not_found';
  end if;

  return true;
end;
$$;

grant usage on schema private to anon, authenticated;
grant usage on type public.tier to anon, authenticated, service_role;

grant execute on function private.current_user_access_level() to anon, authenticated;
grant execute on function private.current_user_can_access(public.tier) to anon, authenticated;
grant execute on function private.current_user_has_access() to anon, authenticated;

grant select on public.plants to anon, authenticated;
grant select on public.recipes to anon, authenticated;
grant select on public.recipe_components to anon, authenticated;
grant select on public.profiles to authenticated;
grant all on public.license_keys to service_role;
revoke all on public.license_keys from anon, authenticated;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using (id = auth.uid());

drop policy if exists "plants_select_public" on public.plants;
create policy "plants_select_public"
on public.plants
for select
to anon, authenticated
using (true);

drop policy if exists "recipes_select_tiered" on public.recipes;
create policy "recipes_select_tiered"
on public.recipes
for select
to anon, authenticated
using (is_free or private.current_user_can_access(required_tier));

drop policy if exists "recipe_components_select_tiered" on public.recipe_components;
create policy "recipe_components_select_tiered"
on public.recipe_components
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.recipes r
    where r.id = recipe_components.recipe_id
      and (r.is_free or private.current_user_can_access(r.required_tier))
  )
);

