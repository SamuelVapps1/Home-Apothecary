alter table if exists public.plants
  add column if not exists traditional_use_summary text not null default '',
  add column if not exists age_restrictions text[] not null default '{}'::text[],
  add column if not exists max_duration_dose text[] not null default '{}'::text[],
  add column if not exists toxicity_signals text[] not null default '{}'::text[],
  add column if not exists hard_caution boolean not null default false;

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'plants'
      and column_name = 'interactions'
      and data_type = 'ARRAY'
  ) then
    alter table public.plants
      add column if not exists interactions_jsonb jsonb;

    update public.plants
    set interactions_jsonb = coalesce(
      interactions_jsonb,
      (
        select coalesce(
          jsonb_agg(
            jsonb_build_object(
              'drug_or_class', item,
              'mechanism', '',
              'severity', 'MINOR_THEORETICAL'
            )
          ),
          '[]'::jsonb
        )
        from unnest(coalesce(interactions, '{}'::text[])) as item
      )
    )
    where interactions_jsonb is null;

    alter table public.plants
      alter column interactions_jsonb set default '[]'::jsonb,
      alter column interactions_jsonb set not null;

    alter table public.plants
      drop column interactions;

    alter table public.plants
      rename column interactions_jsonb to interactions;
  end if;
end
$$;
