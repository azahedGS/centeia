-- CenteIA — Esquema inicial de base de datos
-- Ejecutar en Supabase SQL Editor: supabase.com/dashboard

-- Configuración de rate
create table if not exists rate_config (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  value numeric not null,
  description text,
  updated_at timestamptz default now()
);

insert into rate_config (key, value, description)
values ('rate_per_hour', 72.20, 'Costo por hora en USD')
on conflict (key) do nothing;

-- Proyectos
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  folio text unique not null,
  name text not null,
  lane text not null check (lane in (
    'Divisas', 'Cripto Masivos', 'Money Free Flex',
    'TDR/EKTV', 'Cripto Backoffice', 'Cripto Corporativo'
  )),
  status text not null default 'active' check (status in (
    'active', 'at_risk', 'released', 'on_hold'
  )),
  release_date date,
  owner text,
  source text check (source in ('Goverfolio', 'Epicron', 'GantiAgile')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Historial de cambios de estatus
create table if not exists project_status_history (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade,
  from_status text,
  to_status text not null,
  changed_by text,
  note text,
  created_at timestamptz default now()
);

-- Capacidad del equipo
create table if not exists team_capacity (
  id uuid primary key default gen_random_uuid(),
  person_name text not null,
  lane text not null,
  available_hours numeric default 0,
  total_hours numeric default 40,
  week_start date not null,
  updated_at timestamptz default now(),
  unique(person_name, week_start)
);

-- RLS básico (ajustar según auth)
alter table projects enable row level security;
alter table project_status_history enable row level security;
alter table team_capacity enable row level security;
alter table rate_config enable row level security;

-- Políticas de lectura pública temporal (ajustar con auth real)
create policy "Allow read" on projects for select using (true);
create policy "Allow read" on project_status_history for select using (true);
create policy "Allow read" on team_capacity for select using (true);
create policy "Allow read" on rate_config for select using (true);
