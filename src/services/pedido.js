import { db } from "../services/firebase";

const getPedidos = async () => {
  const snapshot = await db.collection("pedidos").get();
  const pedidos = [];
  snapshot.forEach((doc) => {
    pedidos.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  return pedidos;
};

const getFolioPedidoBorrador = async () => {
  const pedidoDoc = await db.collection("pedidos").add({ estado: "Borrador" });
  return pedidoDoc.id;
};

export { getFolioPedidoBorrador };
