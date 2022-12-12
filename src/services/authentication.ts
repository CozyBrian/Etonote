import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";

export const user_auth = getAuth();

const provider = new GoogleAuthProvider();

export const registerUser = (email: string, password: string) => {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password);
};

export const loginUser = (email: string, password: string) => {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password);
};

export const loginWithGoogle = () => {
  const auth = getAuth();
  return signInWithRedirect(auth, provider);
};

export const afterRedirect = () => {
  return getRedirectResult(user_auth);
};

export const logOutUser = () => {
  const auth = getAuth();
  return signOut(auth);
};

export const getError = (errorCode: string) => {
  return errorCode.split("/")[1].replace("-", " ");
};
