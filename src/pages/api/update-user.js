import firebaseAdmin from "firebase-admin";
import { auth, db } from "../../services/firebase";
const serviceAccount = require(`../../${process.env.FIREBASE_SERVICE_ACCOUNT_FILENAME}`);
const admin =
  firebaseAdmin.apps?.length > 0
    ? firebaseAdmin.apps[0]
    : firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(serviceAccount),
      });

export default async (req, res) => {
  if (req.method !== "PUT") {
    res.status(400).send();
  }
  admin.auth().updateUser(req.body.id, {
    displayName: req.body.nombre,
    password: req.body.nuevaContraseña,
  });
  admin.auth().setCustomUserClaims(req.body.id, { puesto: req.body.puesto });
  const updatedUser = await admin.auth().getUser(req.body.id);
  res.status(200).json({ updatedUser });
};
