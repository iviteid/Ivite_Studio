create table if not exists public.wedding_responses (
 id uuid primary key default gen_random_uuid(),
 wedding_id text not null,
 kind text not null check (kind in ('rsvp','guestbook')),
 name text not null check (char_length(name) between 1 and 100),
 message text not null default '' check (char_length(message) <= 1000),
 attendance text check (attendance in ('yes','no')),
 guests integer check (guests between 0 and 4),
 dietary text not null default '' check (char_length(dietary) <= 200),
 approved boolean not null default false,
 created_at timestamptz not null default now()
);
alter table public.wedding_responses enable row level security;
-- No anonymous read/write policies. Only the server service role can access responses.
-- Moderate messages in Supabase, then copy approved public messages into wedding.ts.
