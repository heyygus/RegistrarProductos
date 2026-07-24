import Link from "next/link";

export default function PaginaInicio() {
  return (
    <div className="shell">
      <header className="masthead">
        <div className="masthead-left">
          <div className="logo-mark">M</div>
          <div>
            <div className="eyebrow">Sistema de registro y control · v1.0</div>
            <h1>Manifiesto</h1>
          </div>
        </div>
        <nav className="masthead-right">
          <span className="nav-tab active">Inicio</span>
          <Link href="/registrar" className="nav-tab">
            Registrar producto
          </Link>
          <Link href="/consulta" className="nav-tab">
            Consultar productos
          </Link>
        </nav>
      </header>

      {/* ---------- Hero ---------- */}
      <section className="hero">
        <div>
          <div className="hero-eyebrow">Control de inventario · UNEXPO</div>
          <h2 className="hero-title">
            Registra y consulta el <span className="accent">stock</span> de
            tu almacén en un solo lugar
          </h2>
          <p className="hero-sub">
            Manifiesto es el sistema de registro y control de productos para
            el almacén: da de alta cada producto que entra, con su lote,
            proveedor y ubicación, y consulta o exporta lo registrado en
            cualquier momento. Los datos viven en una base de datos real
            (Postgres / Supabase), no se pierden al recargar la página.
          </p>
          <div className="hero-ctas">
            <Link href="/registrar" className="hero-cta-primary">
              Registrar producto
            </Link>
            <Link href="/consulta" className="hero-cta-secondary">
              Consultar productos
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <svg
            className="hero-visual-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path
              d="M3 7.5L12 3l9 4.5-9 4.5-9-4.5Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 7.5V16.5L12 21l9-4.5V7.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M12 12v9" strokeLinecap="round" />
          </svg>
        </div>
      </section>

      {/* ---------- Mini destacados ---------- */}
      <div className="feature-strip">
        <div className="feature-chip">
          <div className="feature-chip-icon">⚡</div>
          <div>
            <div className="feature-chip-title">Registro rápido</div>
            <div className="feature-chip-sub">Formulario guiado</div>
          </div>
        </div>
        <div className="feature-chip">
          <div className="feature-chip-icon">☁</div>
          <div>
            <div className="feature-chip-title">En la nube</div>
            <div className="feature-chip-sub">Postgres / Supabase</div>
          </div>
        </div>
        <div className="feature-chip">
          <div className="feature-chip-icon">⌕</div>
          <div>
            <div className="feature-chip-title">Búsqueda instantánea</div>
            <div className="feature-chip-sub">Por código o proveedor</div>
          </div>
        </div>
        <div className="feature-chip">
          <div className="feature-chip-icon">⤓</div>
          <div>
            <div className="feature-chip-title">Exportable</div>
            <div className="feature-chip-sub">Reporte en CSV</div>
          </div>
        </div>
      </div>

      {/* ---------- Accesos principales ---------- */}
      <div className="grid-two hero-actions">
        <Link href="/registrar" className="action-card">
          <span className="tag">Entrada de datos</span>
          <h3>Registrar producto</h3>
          <p>
            Completa el formulario de ingreso: código, descripción, fechas,
            operario, stock y proveedor.
          </p>
          <span className="action-card-cta">Ir a registrar →</span>
        </Link>

        <Link href="/consulta" className="action-card">
          <span className="tag">Consulta y reportes</span>
          <h3>Consultar productos</h3>
          <p>
            Busca por código, descripción o proveedor, y exporta el listado
            completo en CSV.
          </p>
          <span className="action-card-cta">Ir a consultar →</span>
        </Link>
      </div>

      {/* ---------- Stats ---------- */}
      <div className="stats-bar">
        <div className="stat-item">
          <div className="stat-number">v1.0</div>
          <div className="stat-label">Versión actual</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">2</div>
          <div className="stat-label">Módulos</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">100%</div>
          <div className="stat-label">Datos en la nube</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">24/7</div>
          <div className="stat-label">Disponibilidad</div>
        </div>
      </div>

      {/* ---------- Cómo funciona ---------- */}
      <section className="panel how-it-works">
        <div className="panel-header">
          <h2>Cómo funciona</h2>
          <span className="tag">Guía rápida</span>
        </div>
        <div className="panel-body">
          <div className="ticket">
            <div className="ticket-top">
              <span className="ticket-folio">PASO · 01</span>
            </div>
            <div className="ticket-title">Completa el formulario</div>
            <p className="ticket-hint">
              Todos los campos marcados son obligatorios, según las reglas de
              validación del sistema.
            </p>
          </div>
          <div className="ticket">
            <div className="ticket-top">
              <span className="ticket-folio">PASO · 02</span>
            </div>
            <div className="ticket-title">El sistema valida y guarda</div>
            <p className="ticket-hint">
              Los datos se guardan en una base de datos real (Postgres /
              Supabase). No se pierden al recargar la página.
            </p>
          </div>
          <div className="ticket">
            <div className="ticket-top">
              <span className="ticket-folio">PASO · 03</span>
            </div>
            <div className="ticket-title">Consulta lo registrado</div>
            <p className="ticket-hint">
              Ve a{" "}
              <Link href="/consulta" className="link-forest">
                Consultar productos
              </Link>{" "}
              para ver, buscar y exportar el listado completo.
            </p>
          </div>
        </div>
      </section>

      <div className="footer-note">
        <span>Ingeniería de Software. Evaluación #4</span>
        <span>Gustavo Reyes, Luis Maldonado, Abraham Rodríguez</span>
      </div>
    </div>
  );
}
