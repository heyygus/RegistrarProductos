# Manifiesto — Sistema de Registro y Control de Productos

Aplicación web para el registro y control de productos en stock de un almacén, desarrollada como proyecto para la materia **Ingeniería de Software**. Permite registrar productos que ingresan al almacén con toda su trazabilidad (lote, fechas, operario, proveedor) y consultar, buscar y exportar lo registrado, con persistencia real en base de datos.

**Demo en producción:** https://registrar-productos.vercel.app
**Repositorio:** https://github.com/heyygus/RegistrarProductos

---

## Tabla de contenido

- [Funcionalidad](#funcionalidad)
- [Arquitectura y stack tecnológico](#arquitectura-y-stack-tecnológico)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Modelo de datos](#modelo-de-datos)
- [Validaciones y reglas de negocio](#validaciones-y-reglas-de-negocio)
- [Decisiones de diseño](#decisiones-de-diseño)
- [Cómo correrlo localmente](#cómo-correrlo-localmente)
- [Despliegue](#despliegue)

---

## Funcionalidad

El sistema está compuesto por tres interfaces:

| Ruta | Descripción |
|---|---|
| `/` | Landing: presentación del sistema y accesos directos a las otras dos interfaces. |
| `/registrar` | Interfaz de registro: formulario para dar de alta un producto en el almacén, con confirmación ("Datos registrados") al enviarlo. |
| `/consulta` | Interfaz de respuesta/consulta: listado de productos registrados, con búsqueda por código, descripción o proveedor, y exportación de reporte en CSV. |

## Arquitectura y stack tecnológico

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router) con React 18.
- **Backend:** API Routes de Next.js (`app/api/productos/route.js`) — expone `GET` (listar/buscar) y `POST` (registrar), sin necesidad de un servidor separado.
- **Base de datos:** [Supabase](https://supabase.com) (Postgres administrado), consumida mediante `@supabase/supabase-js`. La persistencia es real: los datos no dependen del navegador ni se pierden al recargar.
- **Estilos:** CSS puro (`app/globals.css`), sin frameworks de UI. Fuente tipográfica: [Arimo](https://fonts.google.com/specimen/Arimo) (Google Fonts).
- **Hosting:** [Vercel](https://vercel.com), con despliegue automático en cada `push` a `main` mediante integración con GitHub.

## Estructura del proyecto

```
app/
├── layout.js              Layout raíz compartido (fuente, franja superior)
├── globals.css            Hoja de estilos única del proyecto
├── page.js                Landing (/)
├── registrar/
│   └── page.js             Interfaz de registro (/registrar)
├── consulta/
│   └── page.js             Interfaz de consulta/respuesta (/consulta)
└── api/
    └── productos/
        └── route.js         API REST (GET / POST) contra Supabase

lib/
└── supabaseClient.js       Cliente de Supabase inicializado con variables de entorno

supabase_schema.sql         Script SQL para crear la tabla `productos` y sus reglas
```

## Modelo de datos

La tabla `productos` (definida en `supabase_schema.sql`) contiene:

| Campo | Tipo | Notas |
|---|---|---|
| `id` | bigint (identity) | Folio autogenerado. |
| `codigo_producto` | text | Obligatorio. |
| `descripcion_producto` | text | Obligatorio. |
| `fecha_registro` | date | Generado automáticamente (`default current_date`). |
| `fecha_recepcion` | date | Obligatorio. |
| `fecha_vencimiento` | date | Opcional (solo productos perecederos). |
| `nombre_operario` / `apellido_operario` | text | Obligatorios. |
| `tipo_identificador` | text | `Lote` \| `Unidades` \| `Caja`. |
| `identificador_valor` | text | Valor del lote/unidades/caja. |
| `cantidad_stock` | integer | Debe ser > 0. |
| `ubicacion` | text | Obligatorio. |
| `tipo_proveedor` | text | `Interno` \| `Externo`. |
| `nombre_proveedor` | text | Obligatorio. |

Row Level Security (RLS) está habilitado con políticas abiertas de lectura e inserción (sin edición ni borrado), suficiente para el alcance académico del proyecto; en un entorno productivo real esto se restringiría por usuario autenticado.

## Validaciones y reglas de negocio

Implementadas en dos capas, como práctica de aseguramiento de calidad (si una falla, la otra detiene el dato inválido igual):

1. **API (`route.js`):** campos obligatorios no vacíos, cantidad en stock entera y mayor a 0, fecha de vencimiento posterior a la fecha de recepción.
2. **Base de datos (`supabase_schema.sql`):** `check constraints` para `tipo_identificador`, `tipo_proveedor`, `cantidad_stock > 0` y `fecha_vencimiento > fecha_recepcion`.

## Decisiones de diseño

- **Separación de rutas por función** (`/`, `/registrar`, `/consulta`) en vez de una sola pantalla, para que cada interfaz tenga una URL propia y sea más clara la navegación.
- **CSS centralizado en un solo archivo** (`globals.css`) usando clases reutilizables (`.panel`, `.ticket`, `.btn-primary`, etc.) en vez de estilos en línea, de modo que el diseño se pueda ajustar sin tocar la lógica de los componentes.
- **Reporte exportable en CSV** en la interfaz de consulta, para cumplir el punto de "reporte opcional" y permitir integrar los datos con Excel/Sheets.

## Cómo correrlo localmente

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.local.example .env.local
# completar con la URL y anon key de un proyecto Supabase (ver supabase_schema.sql)

# 3. Levantar en modo desarrollo
npm run dev
```

Abre `http://localhost:3000`.

## Despliegue

El proyecto está conectado a Vercel mediante integración con GitHub: cada `push` a la rama `main` dispara un nuevo despliegue automáticamente. Las variables de entorno (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) se configuran en el dashboard de Vercel, en **Project Settings → Environment Variables**.
