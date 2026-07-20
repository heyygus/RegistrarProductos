import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabaseClient";

// GET /api/productos?buscar=texto  -> lista/consulta productos registrados
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const buscar = searchParams.get("buscar");

  let query = supabase
    .from("productos")
    .select("*")
    .order("created_at", { ascending: false });

  if (buscar) {
    query = query.or(
      `codigo_producto.ilike.%${buscar}%,descripcion_producto.ilike.%${buscar}%,nombre_proveedor.ilike.%${buscar}%`
    );
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ productos: data });
}

// POST /api/productos -> registra un nuevo producto (interfaz de registro)
export async function POST(request) {
  const body = await request.json();

  const camposObligatorios = [
    "codigoProducto",
    "descripcionProducto",
    "fechaRecepcion",
    "nombreOperario",
    "apellidoOperario",
    "tipoIdentificador",
    "identificadorValor",
    "cantidadStock",
    "ubicacion",
    "tipoProveedor",
    "nombreProveedor",
  ];

  const faltantes = camposObligatorios.filter((campo) => {
    const valor = body[campo];
    return valor === undefined || valor === null || String(valor).trim() === "";
  });

  if (faltantes.length > 0) {
    return NextResponse.json(
      {
        error: "Faltan campos obligatorios.",
        camposFaltantes: faltantes,
      },
      { status: 400 }
    );
  }

  const cantidad = Number(body.cantidadStock);
  if (!Number.isInteger(cantidad) || cantidad <= 0) {
    return NextResponse.json(
      { error: "La cantidad a registrar en stock debe ser un número entero mayor a 0." },
      { status: 400 }
    );
  }

  if (
    body.fechaVencimiento &&
    body.fechaVencimiento <= body.fechaRecepcion
  ) {
    return NextResponse.json(
      {
        error:
          "La fecha de vencimiento debe ser posterior a la fecha de recepción del producto.",
      },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("productos")
    .insert({
      codigo_producto: body.codigoProducto.trim(),
      descripcion_producto: body.descripcionProducto.trim(),
      fecha_recepcion: body.fechaRecepcion,
      fecha_vencimiento: body.fechaVencimiento || null,
      nombre_operario: body.nombreOperario.trim(),
      apellido_operario: body.apellidoOperario.trim(),
      tipo_identificador: body.tipoIdentificador,
      identificador_valor: body.identificadorValor.trim(),
      cantidad_stock: cantidad,
      ubicacion: body.ubicacion.trim(),
      tipo_proveedor: body.tipoProveedor,
      nombre_proveedor: body.nombreProveedor.trim(),
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ producto: data }, { status: 201 });
}
