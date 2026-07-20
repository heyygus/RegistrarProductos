-- ============================================================
-- Esquema de base de datos: Sistema de Registro y Control de Productos
-- Ejecutar este script completo en Supabase -> SQL Editor -> New query -> Run
-- ============================================================

create table if not exists productos (
  id bigint generated always as identity primary key,
  codigo_producto text not null,
  descripcion_producto text not null,
  fecha_registro date not null default current_date,
  fecha_recepcion date not null,
  fecha_vencimiento date,
  nombre_operario text not null,
  apellido_operario text not null,
  tipo_identificador text not null check (tipo_identificador in ('Lote', 'Unidades', 'Caja')),
  identificador_valor text not null,
  cantidad_stock integer not null check (cantidad_stock > 0),
  ubicacion text not null,
  tipo_proveedor text not null check (tipo_proveedor in ('Interno', 'Externo')),
  nombre_proveedor text not null,
  created_at timestamptz not null default now(),

  -- Regla de negocio: si hay fecha de vencimiento, debe ser posterior a la recepción
  constraint vencimiento_posterior_a_recepcion check (
    fecha_vencimiento is null or fecha_vencimiento > fecha_recepcion
  )
);

-- Habilitar Row Level Security (obligatorio en Supabase)
alter table productos enable row level security;

-- Políticas abiertas para esta demo académica:
-- cualquiera con la anon key puede leer e insertar (no editar/borrar).
-- Para un sistema real de producción, esto se restringiría por usuario autenticado.
create policy "lectura_publica_productos"
  on productos for select
  using (true);

create policy "insercion_publica_productos"
  on productos for insert
  with check (true);

-- Índice para búsquedas rápidas por código de producto en la interfaz de consulta
create index if not exists idx_productos_codigo on productos (codigo_producto);
