create extension if not exists pgcrypto;

create table if not exists public.wedding_tickets (
  id uuid primary key default gen_random_uuid(),
  guest_name text not null,
  guest_name_key text generated always as (lower(regexp_replace(trim(guest_name), '[[:space:]]+', ' ', 'g'))) stored unique,
  party_size smallint not null default 1 check (party_size between 1 and 10),
  token text not null unique default encode(gen_random_bytes(24), 'hex'),
  is_demo boolean not null default false,
  checked_in_at timestamptz,
  checked_in_by text,
  created_at timestamptz not null default now()
);

alter table public.wedding_tickets enable row level security;
grant all on table public.wedding_tickets to service_role;

-- Invités fictifs pour parcourir le processus complet avant d'ajouter la vraie liste.
insert into public.wedding_tickets (guest_name, party_size, is_demo) values
  ('Aline Fotso', 1, true),
  ('Brice Nguema', 1, true),
  ('Clarisse Mbarga', 2, true),
  ('David Kamga', 1, true),
  ('Estelle Njoya', 1, true),
  ('Fabrice Tchoumi', 2, true),
  ('Gisèle Mballa', 1, true),
  ('Hervé Talla', 1, true),
  ('Ingrid Ewane', 2, true),
  ('Jean Moukouri', 1, true),
  ('Karine Ndom', 1, true),
  ('Lionel Kouam', 2, true),
  ('Mireille Fomo', 1, true),
  ('Nicolas Biloa', 1, true),
  ('Olivia Nguini', 2, true),
  ('Patrick Mvondo', 1, true),
  ('Rachel Simo', 1, true),
  ('Samuel Kengne', 2, true),
  ('Véronique Essomba', 1, true),
  ('Yannick Mba', 1, true)
on conflict (guest_name_key) do nothing;
