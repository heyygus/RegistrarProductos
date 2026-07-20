"use client";

import { useState } from "react";
import Link from "next/link";

const ESTADO_INICIAL = {
  codigoProducto: "",
  descripcionProducto: "",
  fechaRecepcion: "",
  fechaVencimiento: "",
  nombreOperario: "",
  apellidoOperario: "",
  tipoIdentificador: "Lote",
  identificadorValor: "",
  cantidadStock: "",
  ubicacion: "",
  tipoProveedor: "Interno",
  nombreProveedor: "",
};

export default function PaginaRegistro() {
  const [form, setForm] = useState(ESTADO_INICIAL);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState(null);
  const [productoRegistrado, setProductoRegistrado] = useState(null);

  function actualizarCampo(campo, valor) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  }

  async function manejarEnvio(e) {
    e.preventDefault();
    setError(null);
    setEnviando(true);

    try {
      const respuesta = await fetch("/api/productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(data.error || "No se pudo registrar el producto.");
      }

      setProductoRegistrado(data.producto);
    } catch (err) {
      setError(err.message);
    } finally {
      setEnviando(false);
    }
  }

  function registrarOtro() {
    setProductoRegistrado(null);
    setForm(ESTADO_INICIAL);
  }

  return (
    <div className="shell">
      <header className="masthead">
        <div className="masthead-left">
          <div className="eyebrow">Sistema de registro y control · v1.0</div>
          <h1>Manifiesto</h1>
        </div>
        <nav className="masthead-right">
          <span className="nav-tab active">Registrar producto</span>
          <Link href="/consulta" className="nav-tab">
            Consultar productos
          </Link>
        </nav>
      </header>

      <div className="grid-two">
        {/* ---------- Interfaz de registro de productos ---------- */}
        <section className="panel">
          <div className="panel-header">
            <h2>Interfaz de registro de productos</h2>
            <span className="tag">Entrada de datos</span>
          </div>
          <div className="panel-body">
            {productoRegistrado ? (
              <ConfirmacionRegistro
                producto={productoRegistrado}
                onRegistrarOtro={registrarOtro}
              />
            ) : (
              <form onSubmit={manejarEnvio}>
                <div className="form-section-label">Identificación del producto</div>
                <div className="field-grid">
                  <div className="field half">
                    <label>Código del producto</label>
                    <input
                      required
                      value={form.codigoProducto}
                      onChange={(e) => actualizarCampo("codigoProducto", e.target.value)}
                      placeholder="Ej. PRD-00231"
                    />
                  </div>
                  <div className="field half">
                    <label>
                      Tipo de identificador <span className="opt">(según el producto)</span>
                    </label>
                    <select
                      value={form.tipoIdentificador}
                      onChange={(e) => actualizarCampo("tipoIdentificador", e.target.value)}
                    >
                      <option value="Lote">Lote</option>
                      <option value="Unidades">Unidades</option>
                      <option value="Caja">Caja</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Descripción del producto</label>
                    <input
                      required
                      value={form.descripcionProducto}
                      onChange={(e) =>
                        actualizarCampo("descripcionProducto", e.target.value)
                      }
                      placeholder="Ej. Detergente líquido 1L"
                    />
                  </div>
                  <div className="field">
                    <label>Número de {form.tipoIdentificador.toLowerCase()}</label>
                    <input
                      required
                      value={form.identificadorValor}
                      onChange={(e) =>
                        actualizarCampo("identificadorValor", e.target.value)
                      }
                      placeholder="Ej. L-2026-0091"
                    />
                  </div>
                </div>

                <div className="form-section-label">Fechas</div>
                <div className="field-grid">
                  <div className="field half">
                    <label>Fecha de recepción</label>
                    <input
                      required
                      type="date"
                      value={form.fechaRecepcion}
                      onChange={(e) => actualizarCampo("fechaRecepcion", e.target.value)}
                    />
                  </div>
                  <div className="field half">
                    <label>
                      Fecha de vencimiento <span className="opt">(si aplica)</span>
                    </label>
                    <input
                      type="date"
                      value={form.fechaVencimiento}
                      onChange={(e) =>
                        actualizarCampo("fechaVencimiento", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="form-section-label">Operario que registra</div>
                <div className="field-grid">
                  <div className="field half">
                    <label>Nombre</label>
                    <input
                      required
                      value={form.nombreOperario}
                      onChange={(e) => actualizarCampo("nombreOperario", e.target.value)}
                    />
                  </div>
                  <div className="field half">
                    <label>Apellido</label>
                    <input
                      required
                      value={form.apellidoOperario}
                      onChange={(e) =>
                        actualizarCampo("apellidoOperario", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="form-section-label">Stock y proveedor</div>
                <div className="field-grid">
                  <div className="field half">
                    <label>Cantidad a registrar en stock</label>
                    <input
                      required
                      type="number"
                      min="1"
                      value={form.cantidadStock}
                      onChange={(e) => actualizarCampo("cantidadStock", e.target.value)}
                    />
                  </div>
                  <div className="field half">
                    <label>Ubicación</label>
                    <input
                      required
                      value={form.ubicacion}
                      onChange={(e) => actualizarCampo("ubicacion", e.target.value)}
                      placeholder="Ej. Almacén B, estante 4"
                    />
                  </div>
                  <div className="field half">
                    <label>Tipo de proveedor</label>
                    <select
                      value={form.tipoProveedor}
                      onChange={(e) => actualizarCampo("tipoProveedor", e.target.value)}
                    >
                      <option value="Interno">Interno</option>
                      <option value="Externo">Externo</option>
                    </select>
                  </div>
                  <div className="field half">
                    <label>Nombre del proveedor</label>
                    <input
                      required
                      value={form.nombreProveedor}
                      onChange={(e) =>
                        actualizarCampo("nombreProveedor", e.target.value)
                      }
                    />
                  </div>
                </div>

                {error && <div className="error-banner">{error}</div>}

                <button className="btn-primary" type="submit" disabled={enviando}>
                  {enviando ? "Registrando…" : "Registrar producto"}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* ---------- Panel lateral informativo ---------- */}
        <aside className="panel">
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
              <p style={{ fontSize: 13, color: "var(--muted)", margin: 0 }}>
                Todos los campos marcados son obligatorios, según las reglas de
                validación del sistema.
              </p>
            </div>
            <div className="ticket">
              <div className="ticket-top">
                <span className="ticket-folio">PASO · 02</span>
              </div>
              <div className="ticket-title">El sistema valida y guarda</div>
              <p style={{ fontSize: 13, color: "var(--muted)", margin: 0 }}>
                Los datos se guardan en una base de datos real (Postgres /
                Supabase). No se pierden al recargar la página.
              </p>
            </div>
            <div className="ticket">
              <div className="ticket-top">
                <span className="ticket-folio">PASO · 03</span>
              </div>
              <div className="ticket-title">Consulta lo registrado</div>
              <p style={{ fontSize: 13, color: "var(--muted)", margin: 0 }}>
                Ve a{" "}
                <Link href="/consulta" style={{ color: "var(--forest)", fontWeight: 600 }}>
                  Consultar productos
                </Link>{" "}
                para ver, buscar y exportar el listado completo.
              </p>
            </div>
          </div>
        </aside>
      </div>

      <div className="footer-note">
        <span>Sistema de Registro y Control de Productos — Evaluación N.º 4</span>
        <span>Calidad del Software · UNEXPO</span>
      </div>
    </div>
  );
}

function ConfirmacionRegistro({ producto, onRegistrarOtro }) {
  return (
    <div className="confirm-wrap">
      <div className="confirm-seal">
        <svg viewBox="0 0 24 24" fill="none" stroke="#2c5a45" strokeWidth="2.5">
          <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="confirm-title">Datos registrados</div>
      <div className="confirm-sub">
        Folio <span className="mono">#{String(producto.id).padStart(5, "0")}</span> ·{" "}
        {producto.descripcion_producto}
      </div>

      <div className="ticket" style={{ textAlign: "left", marginBottom: 20 }}>
        <div className="ticket-top">
          <span className="ticket-folio mono">
            {producto.codigo_producto}
          </span>
          <span className="ticket-stamp">Registrado</span>
        </div>
        <div className="ticket-title">{producto.descripcion_producto}</div>
        <div className="ticket-meta">
          <span className="k">Cantidad</span>
          <span>{producto.cantidad_stock}</span>
          <span className="k">Ubicación</span>
          <span>{producto.ubicacion}</span>
          <span className="k">Proveedor</span>
          <span>
            {producto.nombre_proveedor} ({producto.tipo_proveedor})
          </span>
          <span className="k">Recepción</span>
          <span>{producto.fecha_recepcion}</span>
        </div>
      </div>

      <div className="confirm-actions">
        <button className="btn-primary" style={{ width: "auto", margin: 0 }} onClick={onRegistrarOtro}>
          Registrar otro producto
        </button>
        <Link href="/consulta" className="btn-secondary" style={{ textDecoration: "none" }}>
          Consultar productos
        </Link>
      </div>
    </div>
  );
}
