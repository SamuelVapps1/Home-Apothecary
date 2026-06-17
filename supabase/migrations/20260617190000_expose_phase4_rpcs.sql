create or replace function public.consume_rate_limit(
  p_bucket text,
  p_limit integer,
  p_window_seconds integer
)
returns boolean
language sql
security definer
set search_path = public, private
as $$
  select private.consume_rate_limit(p_bucket, p_limit, p_window_seconds);
$$;

create or replace function public.redeem_license_key(
  p_key text,
  p_user_id uuid
)
returns boolean
language sql
security definer
set search_path = public, private
as $$
  select private.redeem_license_key(p_key, p_user_id);
$$;

-- KRITICKÉ: Postgres defaultne dáva EXECUTE roli PUBLIC pri každom CREATE FUNCTION.
-- Bez týchto revoke by anon/authenticated mohli volať tieto RPC priamo cez PostgREST
-- a obísť auth v /api/redeem (redeem na ľubovoľné user_id).
revoke execute on function public.consume_rate_limit(text, integer, integer) from public, anon, authenticated;
revoke execute on function public.redeem_license_key(text, uuid) from public, anon, authenticated;

grant execute on function public.consume_rate_limit(text, integer, integer) to service_role;
grant execute on function public.redeem_license_key(text, uuid) to service_role;
