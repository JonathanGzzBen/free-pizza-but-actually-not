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

export { getEspecialidades };
