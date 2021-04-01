import { db } from "../services/firebase";

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
  return {
    folio: pedidoDoc.id,
    ...pedidoDoc.data(),
  };
};

const updatePedido = (pedido) =>
  db.collection("pedidos").doc(pedido.folio).set({
    cliente: pedido.cliente,
    telefono: pedido.telefono,
    direccion: pedido.direccion,
    tamaño: pedido.tamaño,
    especialidades: pedido.especialidades,
    bebidas: pedido.bebidas,
    formaPago: pedido.formaPago,
    estado: pedido.estado,
  });

const getDetalle = async (pedido) => {
  const tamañoDoc = await db.collection("tamaños").doc(pedido.tamaño).get();
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

export {
  getPedidos,
  getFolioPedidoBorrador,
  getPedidoById,
  updatePedido,
  getDetalle,
};
