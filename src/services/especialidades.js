import { db } from "../services/firebase";

const getEspecialidades = async () => {
  const snapshot = await db.collection("especialidades").get();
  const especialidades = [];
  snapshot.forEach((doc) => {
    especialidades.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  return especialidades;
};

const agregarEspecialidad = (nuevaEspecialidad) =>
  db.collection("especialidades").add({
    nombre: nuevaEspecialidad.nombre,
    descripcion: nuevaEspecialidad.descripcion,
  });

const eliminarEspecialidad = (especialidad) =>
  db.collection("especialidades").doc(especialidad.id).delete();

const actualizarEspecialidad = (especialidad) =>
  db.collection("especialidades").doc(especialidad.id).update({
    nombre: especialidad.nombre,
    descripcion: especialidad.descripcion,
  });

export {
  getEspecialidades,
  agregarEspecialidad,
  eliminarEspecialidad,
  actualizarEspecialidad,
};
