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

export { getTamaños };
