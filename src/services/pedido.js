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

export { getPedidos, getFolioPedidoBorrador, getPedidoById, updatePedido };
