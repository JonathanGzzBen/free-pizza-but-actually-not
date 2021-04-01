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

export { getBebidas };
