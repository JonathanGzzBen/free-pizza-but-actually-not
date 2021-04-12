import firebaseAdmin from "firebase-admin";
const serviceAccount = require(`../../${process.env.FIREBASE_SERVICE_ACCOUNT_FILENAME}`);
const admin =
  firebaseAdmin.apps?.length > 0
    ? firebaseAdmin.apps[0]
    : firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(serviceAccount),
      });

const validate = async (token) => {
  const decodedToken = await admin.auth().verifyIdToken(token, true);
  console.log("Valid token.");
  const data = {};

  const user = await admin.auth().getUser(decodedToken.uid);
  const result = {
    user: user,
    userData: data,
  };
  return result;
};

export default async (req, res) => {
  //   res.status(200).send({ comes: "comes" });
  if (req.method === "GET") {
    try {
      const { token } = JSON.parse(req.headers.authorization || "{}");
      if (!token) {
        return res
          .status(403)
          .send({ errorCode: 403, message: "Auth token missing" });
      }
      const result = await validate(token);
      return res.status(200).send(result);
    } catch (err) {
      return res.status(err.code).send({
        errorCode: err.code,
        message: err.message,
      });
    }
  } else {
    res.status(400).send();
  }
};
