import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyCVCp9-zpgfj3w6t3FssVHP9eNiedc94DI",
  authDomain: "free-pizza-but-actually-not.firebaseapp.com",
  projectId: "free-pizza-but-actually-not",
  storageBucket: "free-pizza-but-actually-not.appspot.com",
  messagingSenderId: "473132771396",
  appId: "1:473132771396:web:d8866e9a1582fef86ef411",
};

const app =
  firebase.apps?.length > 0
    ? firebase.apps[0]
    : firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

export default app;
export { db, auth };
