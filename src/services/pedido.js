import { db } from "../services/firebase";

const getPrecios = (pedido) => {
  let subTotalBebidas = 0;
  pedido.bebidas?.forEach((bebida) => {
    if (bebida?.cantidad > 0) {
      subTotalBebidas += bebida.precio * bebida.cantidad;
    }
  });
  const subTotalTamaño = pedido.tamaño?.precio;
  const subTotal = subTotalBebidas + subTotalTamaño;
  const iva = subTotal * 0.16;
  const total = subTotal + iva;

  return {
    subTotal: subTotal,
    iva: iva,
    total: total,
  };
};

const getDetalle = async (pedido) => {
  if (!pedido.tamaño) {
    return "";
  }
  const tamañoDoc = await db.collection("tamaños").doc(pedido.tamaño.id).get();
  if (!tamañoDoc.data()) {
    return "";
  }
  let detalle = "Tamaño: " + tamañoDoc.data().descripcion + "\n";
  pedido.especialidades.forEach((especialidad) => {
    if (especialidad.incluir) {
      detalle += especialidad.nombre + "\n";
    }
  });
  pedido.bebidas.forEach((bebida) => {
    if (bebida.cantidad > 0) {
      detalle += bebida.nombre + " x" + bebida.cantidad + "\n";
    }
  });
  return detalle;
};

const getPedidos = async () => {
  const snapshot = await db.collection("pedidos").get();
  const pedidos = [];
  snapshot.forEach((doc) => {
    pedidos.push({
      folio: doc.id,
      ...doc.data(),
    });
  });
  return pedidos;
};

const getFolioPedidoBorrador = async () => {
  const pedidoDoc = await db.collection("pedidos").add({ estado: "Borrador" });
  return pedidoDoc.id;
};

const getPedidoById = async (id) => {
  const pedidoDoc = await db.collection("pedidos").doc(id).get();
  const pedido = {
    folio: pedidoDoc.id,
    ...pedidoDoc.data(),
  };
  return {
    ...pedido,
    precios: getPrecios(pedido),
    detalle: await getDetalle(pedido),
  };
};

const updatePedido = async (pedido) =>
  db
    .collection("pedidos")
    .doc(pedido.folio)
    .set({
      cliente: pedido.cliente,
      telefono: pedido.telefono,
      direccion: pedido.direccion,
      tamaño: pedido.tamaño,
      especialidades: pedido.especialidades,
      bebidas: pedido.bebidas,
      formaPago: pedido.formaPago,
      estado: pedido.estado,
      detalle: await getDetalle(pedido),
      ...getPrecios(pedido),
    });

export { getPedidos, getFolioPedidoBorrador, getPedidoById, updatePedido };
