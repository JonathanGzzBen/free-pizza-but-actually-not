import { db } from "../services/firebase";

const getFormasPago = async () => {
  const snapshot = await db.collection("formasPago").get();
  const formasPago = [];
  snapshot.forEach((doc) => {
    formasPago.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  return formasPago;
};

export { getFormasPago };
