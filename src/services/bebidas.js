import { db } from "../services/firebase";

const getBebidas = async () => {
  const snapshot = await db.collection("bebidas").get();
  const bebidas = [];
  snapshot.forEach((doc) => {
    bebidas.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  return bebidas;
};

const agregarBebida = (nuevaBebida) =>
  db.collection("bebidas").add({
    nombre: nuevaBebida.nombre,
    precio: Number(nuevaBebida.precio.replace("$", "")),
  });

const eliminarBebida = (bebida) =>
  db.collection("bebidas").doc(bebida.id).delete();

const actualizarBebida = (bebida) =>
  db
    .collection("bebidas")
    .doc(bebida.id)
    .update({
      nombre: bebida.nombre,
      precio: Number(bebida.precio.toString().replace("$", "")),
    });

export { getBebidas, agregarBebida, eliminarBebida, actualizarBebida };
