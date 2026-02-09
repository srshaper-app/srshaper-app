create extension if not exists "uuid-ossp";

create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  category text,
  subcategory text,
  price_cents integer not null,
  currency text not null default 'USD',
  image_url text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default uuid_generate_v4(),
  stripe_session_id text,
  stripe_payment_intent_id text,
  customer_email text,
  status text not null default 'pending',
  total_cents integer not null,
  currency text not null default 'USD',
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  name text not null,
  price_cents integer not null,
  quantity integer not null default 1
);

create table if not exists public.admins (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid unique,
  email text unique,
  created_at timestamptz not null default now()
);

create table if not exists public.metrics_daily (
  id bigserial primary key,
  metric_date date not null unique,
  unique_visitors integer not null default 0,
  total_impressions integer not null default 0,
  avg_engagement_time_seconds integer not null default 0,
  sessions integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default uuid_generate_v4(),
  name text,
  email text unique not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_newsletter_created_at on public.newsletter_subscribers (created_at desc);

alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.admins enable row level security;
alter table public.metrics_daily enable row level security;
alter table public.newsletter_subscribers enable row level security;

create policy "Public read active products"
  on public.products for select
  using (active = true);

create policy "Admin manage products"
  on public.products for all
  using (exists (select 1 from public.admins where user_id = auth.uid()))
  with check (exists (select 1 from public.admins where user_id = auth.uid()));

create policy "Admin read orders"
  on public.orders for select
  using (exists (select 1 from public.admins where user_id = auth.uid()));

create policy "Admin read order items"
  on public.order_items for select
  using (exists (select 1 from public.admins where user_id = auth.uid()));

create policy "Admin manage metrics"
  on public.metrics_daily for all
  using (exists (select 1 from public.admins where user_id = auth.uid()))
  with check (exists (select 1 from public.admins where user_id = auth.uid()));

create policy "Admin manage admins"
  on public.admins for all
  using (exists (select 1 from public.admins where user_id = auth.uid()))
  with check (exists (select 1 from public.admins where user_id = auth.uid()));

create policy "Admin read newsletter"
  on public.newsletter_subscribers for select
  using (exists (select 1 from public.admins where user_id = auth.uid()));

create policy "Public insert newsletter"
  on public.newsletter_subscribers for insert
  with check (email is not null);
