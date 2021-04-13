import { auth } from "../services/firebase";

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

export { getCurrentUser, signIn, register, signOut };
