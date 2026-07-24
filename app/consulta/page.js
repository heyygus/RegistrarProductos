"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function PaginaConsulta() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  async function cargarProductos(texto = "") {
    setCargando(true);
    setError(null);
    try {
      const url = texto
        ? `/api/productos?buscar=${encodeURIComponent(texto)}`
        : "/api/productos";
      const respuesta = await fetch(url);
      const data = await respuesta.json();
      if (!respuesta.ok) throw new Error(data.error || "Error al consultar.");
      setProductos(data.productos || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarProductos();
  }, []);

  function manejarBusqueda(e) {
    e.preventDefault();
    cargarProductos(busqueda);
  }

  function generarReporteCSV() {
    if (productos.length === 0) return;

    const encabezados = [
      "Folio",
      "Código",
      "Descripción",
      "Identificador",
      "Cantidad",
      "Ubicación",
      "Proveedor",
      "Tipo proveedor",
      "Fecha recepción",
      "Fecha vencimiento",
      "Operario",
      "Fecha registro",
    ];

    const filas = productos.map((p) => [
      p.id,
      p.codigo_producto,
      p.descripcion_producto,
      `${p.tipo_identificador}: ${p.identificador_valor}`,
      p.cantidad_stock,
      p.ubicacion,
      p.nombre_proveedor,
      p.tipo_proveedor,
      p.fecha_recepcion,
      p.fecha_vencimiento || "",
      `${p.nombre_operario} ${p.apellido_operario}`,
      p.fecha_registro,
    ]);

    const csv = [encabezados, ...filas]
      .map((fila) => fila.map((v) => `"${String(v).replaceAll('"', '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const enlace = document.createElement("a");
    enlace.href = URL.createObjectURL(blob);
    enlace.download = `reporte-productos-${new Date().toISOString().slice(0, 10)}.csv`;
    enlace.click();
  }

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
          <Link href="/" className="nav-tab">
            Inicio
          </Link>
          <Link href="/registrar" className="nav-tab">
            Registrar producto
          </Link>
          <span className="nav-tab active">Consultar productos</span>
        </nav>
      </header>

      <section className="panel">
        <div className="panel-header">
          <h2>Interfaz de consulta de productos</h2>
          <span className="tag">{productos.length} registrados</span>
        </div>
        <div className="panel-body">
          <form className="search-bar" onSubmit={manejarBusqueda}>
            <input
              placeholder="Buscar por código, descripción o proveedor…"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <button className="btn-secondary" type="submit">
              Buscar
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={generarReporteCSV}
              disabled={productos.length === 0}
            >
              Generar reporte (CSV)
            </button>
          </form>

          {error && <div className="error-banner">{error}</div>}

          {cargando ? (
            <div className="empty-state">Cargando productos…</div>
          ) : productos.length === 0 ? (
            <div className="empty-state">
              No hay productos que coincidan con la búsqueda. Registra uno desde{" "}
              <Link href="/registrar" className="link-forest">
                la interfaz de registro
              </Link>
              .
            </div>
          ) : (
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Folio</th>
                    <th>Código</th>
                    <th>Descripción</th>
                    <th>Identificador</th>
                    <th>Cantidad</th>
                    <th>Ubicación</th>
                    <th>Proveedor</th>
                    <th>Recepción</th>
                    <th>Vencimiento</th>
                    <th>Operario</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((p) => (
                    <tr key={p.id}>
                      <td className="mono">#{String(p.id).padStart(5, "0")}</td>
                      <td className="mono">{p.codigo_producto}</td>
                      <td>{p.descripcion_producto}</td>
                      <td>
                        <span className="pill">
                          {p.tipo_identificador}: {p.identificador_valor}
                        </span>
                      </td>
                      <td>{p.cantidad_stock}</td>
                      <td>{p.ubicacion}</td>
                      <td>
                        {p.nombre_proveedor}
                        <br />
                        <span className="subtext-muted">
                          {p.tipo_proveedor}
                        </span>
                      </td>
                      <td>{p.fecha_recepcion}</td>
                      <td>{p.fecha_vencimiento || "—"}</td>
                      <td>
                        {p.nombre_operario} {p.apellido_operario}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      <div className="footer-note">
        <span>Ingeniería de Software. Evaluación #4</span>
        <span>Gustavo Reyes, Luis Maldonado, Abraham Rodríguez</span>
      </div>
    </div>
  );
}
