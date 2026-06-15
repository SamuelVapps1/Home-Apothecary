create table if not exists public.rate_limit_counters (
  bucket text primary key,
  request_count integer not null default 0,
  window_started_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.rate_limit_counters enable row level security;

drop trigger if exists touch_rate_limit_counters_updated_at on public.rate_limit_counters;
create trigger touch_rate_limit_counters_updated_at
before update on public.rate_limit_counters
for each row execute function private.touch_updated_at();

create or replace function private.consume_rate_limit(
  p_bucket text,
  p_limit integer,
  p_window_seconds integer
)
returns boolean
language plpgsql
security definer
set search_path = public, private
as $$
declare
  v_now timestamptz := now();
  v_row public.rate_limit_counters%rowtype;
begin
  insert into public.rate_limit_counters as counters (bucket, request_count, window_started_at, created_at, updated_at)
  values (p_bucket, 1, v_now, v_now, v_now)
  on conflict (bucket) do update
    set request_count = case
          when counters.window_started_at <= v_now - make_interval(secs => p_window_seconds)
            then 1
          else counters.request_count + 1
        end,
        window_started_at = case
          when counters.window_started_at <= v_now - make_interval(secs => p_window_seconds)
            then v_now
          else counters.window_started_at
        end,
        updated_at = v_now
  returning * into v_row;

  return v_row.request_count <= p_limit;
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
  set has_access = true,
      activated_at = now(),
      updated_at = now()
  where id = p_user_id;

  if not found then
    raise exception 'profile_not_found';
  end if;

  return true;
end;
$$;

revoke all on function private.consume_rate_limit(text, integer, integer) from anon, authenticated;
revoke all on function private.redeem_license_key(text, uuid) from anon, authenticated;
grant execute on function private.consume_rate_limit(text, integer, integer) to service_role;
grant execute on function private.redeem_license_key(text, uuid) to service_role;

grant all on public.rate_limit_counters to service_role;
revoke all on public.rate_limit_counters from anon, authenticated;
