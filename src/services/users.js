import Cookies from "cookies";
import { auth, tokenName } from "../services/firebase";

const getCurrentUser = () => {
  return auth.currentUser;
};

const signIn = async (email, contraseña) => {
  const userCredential = await auth.signInWithEmailAndPassword(
    email,
    contraseña
  );
  return userCredential.user;
};

const register = async (email, contraseña) => {
  const userCredential = await auth.createUserWithEmailAndPassword(
    email,
    contraseña
  );
  return userCredential.user;
};

const signOut = () => {
  auth.signOut();
};

const validateOnServerSide = async (req, res) => {
  const cookies = new Cookies(req, res);
  const headers = {
    "Content-Type": "application/json",
    Authorization: JSON.stringify({
      token: cookies.get(tokenName),
    }),
  };
  // const response = await fetch("http://localhost:3000/api/validate", {
  const response = await fetch(`${process.env.APP_HOST}/api/validate`, {
    headers,
  });
  const user = (await response.json()).user;
  return user;
};

export { getCurrentUser, signIn, register, signOut, validateOnServerSide };
