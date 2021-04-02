import firebaseAdmin from "firebase-admin";
const serviceAccount = require(`../../${process.env.FIREBASE_SERVICE_ACCOUNT_FILENAME}`);
const admin =
  firebaseAdmin.apps?.length > 0
    ? firebaseAdmin.apps[0]
    : firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(serviceAccount),
      });

export default async (req, res) => {
  const users = [];
  const populateUsers = async (nextPageToken) => {
    const listUsersResult = await admin.auth().listUsers(1000, nextPageToken);
    listUsersResult.users.forEach((userRecord) => {
      users.push({
        id: userRecord.uid,
        email: userRecord.email,
        puesto: userRecord.customClaims?.puesto,
        nombre: userRecord.displayName,
      });
    });
    if (listUsersResult.pageToken) {
      await populateUsers(listUsersResult.pageToken);
    }
  };
  await populateUsers();
  res.status(200).json(users);
};
