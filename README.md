# Manifiesto — Sistema de Registro y Control de Productos

Proyecto para la Evaluación N.º 4 de Calidad del Software (UNEXPO). Incluye:
- Interfaz de registro de productos (`/`)
- Interfaz de respuesta (confirmación "Datos registrados" al guardar)
- Interfaz de consulta de productos, con búsqueda y reporte exportable en CSV (`/consulta`)
- Persistencia real en base de datos Postgres (Supabase)

---

## Paso 1 — Crear el proyecto en Supabase (gratis)

1. Entra a https://supabase.com y crea una cuenta (con GitHub es lo más rápido).
2. Clic en **New project**. Ponle un nombre (ej. `registro-productos`), elige una contraseña de base de datos (guárdala) y una región cercana.
3. Espera 1-2 minutos a que se aprovisione.
4. Ve a **SQL Editor** (ícono de la izquierda) → **New query**.
5. Copia y pega **todo** el contenido del archivo `supabase_schema.sql` (incluido en este proyecto) y dale **Run**. Esto crea la tabla `productos` con todas las reglas de validación.
6. Ve a **Project Settings → API**. Ahí vas a encontrar:
   - **Project URL** → esto es tu `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → esto es tu `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## Paso 2 — Probarlo en tu computadora (opcional pero recomendado)

```bash
# 1. Instalar dependencias
npm install

# 2. Crear tu archivo de variables de entorno
cp .env.local.example .env.local
# y pega ahí tu URL y tu anon key de Supabase

# 3. Correr en modo desarrollo
npm run dev
```

Abre http://localhost:3000 — deberías ver el formulario de registro. Al enviarlo, el dato queda guardado en Supabase de verdad (puedes verlo en Supabase → **Table Editor** → tabla `productos`).

---

## Paso 3 — Subir el proyecto a GitHub

1. Crea un repositorio nuevo en GitHub (puede ser privado).
2. Desde la carpeta del proyecto:

```bash
git init
git add .
git commit -m "Sistema de registro y control de productos"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
git push -u origin main
```

---

## Paso 4 — Desplegar en Vercel

1. Entra a https://vercel.com y crea una cuenta (con GitHub, para que sea inmediato).
2. Clic en **Add New → Project**.
3. Importa el repositorio que acabas de subir.
4. En la sección **Environment Variables**, agrega las mismas dos variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Clic en **Deploy**. En menos de un minuto tendrás una URL pública tipo `https://tu-proyecto.vercel.app`.

Listo: el formulario, la base de datos y la consulta ya están funcionando en producción, en internet, de verdad.

---

## Notas sobre el diseño

- Se usan **políticas de acceso públicas (RLS)** en Supabase para simplificar la demo académica — cualquiera con la anon key puede leer e insertar, pero no editar ni borrar. Para un sistema en producción real, esto se limitaría con autenticación de usuarios.
- El reporte de la interfaz de consulta se genera como **CSV** (abre directamente en Excel/Sheets), cumpliendo el punto opcional del enunciado.
- La regla de negocio "la fecha de vencimiento debe ser posterior a la de recepción" está validada en **dos capas**: en el API (`route.js`) y en la base de datos (`check constraint`), como buena práctica de aseguramiento de calidad — si una falla, la otra la detiene igual.
