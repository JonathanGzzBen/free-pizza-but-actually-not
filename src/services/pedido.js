import { db } from "../services/firebase";

const isPedidoValid = ({
  folio,
  cliente,
  telefono,
  direccion,
  tamaño,
  especialidades,
  bebidas,
  formaPago,
}) => {
  if (
    bebidas?.filter((bebida) => bebida.cantidad < 0 || bebida.precio <= 0)
      .length > 0
  ) {
    return false;
  } else if (tamaño.precio <= 0) {
    return false;
  }
  if (
    !(
      folio &&
      cliente &&
      telefono &&
      direccion &&
      tamaño &&
      especialidades &&
      bebidas &&
      formaPago
    )
  ) {
    return false;
  }
  return true;
};

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

const updatePedido = async (pedido) => {
  await db
    .collection("pedidos")
    .doc(pedido.folio)
    .set({
      cliente: pedido.cliente,
      clienteId: pedido.clienteId,
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
};

export {
  isPedidoValid,
  getPedidos,
  getDetalle,
  getFolioPedidoBorrador,
  getPedidoById,
  updatePedido,
};
