import { db } from "../services/firebase";

const getTamaños = async () => {
  const snapshot = await db.collection("tamaños").get();
  const tamaños = [];
  snapshot.forEach((doc) => {
    tamaños.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  return tamaños;
};

const agregarTamaño = (nuevoTamaño) =>
  db.collection("tamaños").add({
    cantidadIngredientesMaxima: Number(nuevoTamaño.cantidadIngredientesMaxima),
    descripcion: nuevoTamaño.descripcion,
    precio: Number(nuevoTamaño.precio.toString().replace("$", "")),
  });
const eliminarTamaño = (tamaño) =>
  db.collection("tamaños").doc(tamaño.id).delete();

const actualizarTamaño = (tamaño) =>
  db
    .collection("tamaños")
    .doc(tamaño.id)
    .update({
      cantidadIngredientesMaxima: Number(tamaño.cantidadIngredientesMaxima),
      descripcion: tamaño.descripcion,
      precio: Number(tamaño.precio.toString().replace("$", "")),
    });

export { getTamaños, agregarTamaño, eliminarTamaño, actualizarTamaño };
