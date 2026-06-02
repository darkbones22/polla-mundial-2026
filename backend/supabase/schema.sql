-- Esquema inicial Supabase para Polla Mundial 2026.
-- Este archivo es referencial para ejecutar manualmente en Supabase.

create extension if not exists pgcrypto;

create table if not exists participantes (
  id uuid primary key default gen_random_uuid(),
  codigo_legacy text unique,
  nombre_visible text not null,
  codigo_hash text not null,
  activo boolean not null default true,
  creado_en timestamptz not null default now(),
  actualizado_en timestamptz not null default now()
);

create table if not exists pollas (
  id uuid primary key default gen_random_uuid(),
  id_legacy text unique,
  nombre text not null,
  activa boolean not null default true,
  creada_en timestamptz not null default now(),
  actualizada_en timestamptz not null default now()
);

create table if not exists participantes_pollas (
  polla_id uuid not null references pollas(id) on delete cascade,
  participante_id uuid not null references participantes(id) on delete cascade,
  activo boolean not null default true,
  creado_en timestamptz not null default now(),
  primary key (polla_id, participante_id)
);

create table if not exists partidos_grupos (
  id text primary key,
  grupo text not null,
  fecha_hora timestamptz not null,
  equipo_local text not null,
  equipo_visita text not null,
  goles_local_real integer,
  goles_visita_real integer,
  estado text not null default 'Pendiente',
  creado_en timestamptz not null default now(),
  actualizado_en timestamptz not null default now(),
  constraint partidos_grupos_goles_local_real_check check (goles_local_real is null or goles_local_real >= 0),
  constraint partidos_grupos_goles_visita_real_check check (goles_visita_real is null or goles_visita_real >= 0),
  constraint partidos_grupos_estado_check check (estado in ('Pendiente', 'Abierto', 'Cerrado', 'Finalizado'))
);

create table if not exists partidos_eliminacion (
  id text primary key,
  ronda text not null,
  fecha_hora timestamptz not null,
  placeholder_local text,
  equipo_local text,
  placeholder_visita text,
  equipo_visita text,
  goles_local_real integer,
  goles_visita_real integer,
  clasificado_real_lado text,
  estado text not null default 'Pendiente',
  creado_en timestamptz not null default now(),
  actualizado_en timestamptz not null default now(),
  constraint partidos_eliminacion_goles_local_real_check check (goles_local_real is null or goles_local_real >= 0),
  constraint partidos_eliminacion_goles_visita_real_check check (goles_visita_real is null or goles_visita_real >= 0),
  constraint partidos_eliminacion_clasificado_real_lado_check check (
    clasificado_real_lado is null or clasificado_real_lado in ('local', 'visita')
  ),
  constraint partidos_eliminacion_estado_check check (estado in ('Pendiente', 'Abierto', 'Cerrado', 'Finalizado'))
);

create table if not exists pronosticos_grupos (
  id uuid primary key default gen_random_uuid(),
  polla_id uuid not null references pollas(id) on delete cascade,
  participante_id uuid not null references participantes(id) on delete cascade,
  partido_id text not null references partidos_grupos(id) on delete cascade,
  goles_local integer not null,
  goles_visita integer not null,
  enviado_en timestamptz not null default now(),
  actualizado_en timestamptz not null default now(),
  constraint pronosticos_grupos_goles_local_check check (goles_local >= 0),
  constraint pronosticos_grupos_goles_visita_check check (goles_visita >= 0),
  constraint pronosticos_grupos_unico unique (polla_id, participante_id, partido_id)
);

create table if not exists pronosticos_eliminacion (
  id uuid primary key default gen_random_uuid(),
  polla_id uuid not null references pollas(id) on delete cascade,
  participante_id uuid not null references participantes(id) on delete cascade,
  partido_id text not null references partidos_eliminacion(id) on delete cascade,
  goles_local integer not null,
  goles_visita integer not null,
  clasificado_lado text,
  enviado_en timestamptz not null default now(),
  actualizado_en timestamptz not null default now(),
  constraint pronosticos_eliminacion_goles_local_check check (goles_local >= 0),
  constraint pronosticos_eliminacion_goles_visita_check check (goles_visita >= 0),
  constraint pronosticos_eliminacion_clasificado_lado_check check (
    clasificado_lado is null or clasificado_lado in ('local', 'visita')
  ),
  constraint pronosticos_eliminacion_unico unique (polla_id, participante_id, partido_id)
);

create table if not exists configuracion_app (
  clave text primary key,
  valor jsonb not null,
  actualizada_en timestamptz not null default now()
);

create index if not exists participantes_codigo_legacy_idx on participantes(codigo_legacy);
create index if not exists participantes_activo_idx on participantes(activo);
create index if not exists pollas_activa_idx on pollas(activa);
create index if not exists participantes_pollas_participante_id_idx on participantes_pollas(participante_id);
create index if not exists partidos_grupos_fecha_hora_idx on partidos_grupos(fecha_hora);
create index if not exists partidos_grupos_estado_idx on partidos_grupos(estado);
create index if not exists partidos_eliminacion_fecha_hora_idx on partidos_eliminacion(fecha_hora);
create index if not exists partidos_eliminacion_estado_idx on partidos_eliminacion(estado);
create index if not exists pronosticos_grupos_polla_partido_idx on pronosticos_grupos(polla_id, partido_id);
create index if not exists pronosticos_grupos_participante_idx on pronosticos_grupos(participante_id);
create index if not exists pronosticos_eliminacion_polla_partido_idx on pronosticos_eliminacion(polla_id, partido_id);
create index if not exists pronosticos_eliminacion_participante_idx on pronosticos_eliminacion(participante_id);
