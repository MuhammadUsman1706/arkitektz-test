import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  child,
  get,
  set,
  push,
  update,
  remove,
} from "firebase/database";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// Here, all changes that are made to firebase auth or realtime database are written.

const firebaseConfig = {
  apiKey: "AIzaSyCDqz4gE9T3YeEOk4A5ixBL0pQF-VMdxDw",
  authDomain: "arkitektz-test.firebaseapp.com",
  projectId: "arkitektz-test",
  storageBucket: "arkitektz-test.appspot.com",
  messagingSenderId: "900026519694",
  appId: "1:900026519694:web:a9fc03d5300cfda4c3f9df",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

// Realtime Database Functions
export const getUserDetails = async (userId) => {
  const dbRef = ref(database);
  const response = await get(child(dbRef, `users/${userId}/`));
  if (response.exists()) {
    return response.val();
  } else {
    throw new Error("No user exists with that email!");
  }
};

export const setUserDetails = async (userId, email, role) => {
  const result = await set(ref(database, "users/" + userId), { email, role });
  return result;
};

export const getProducts = async () => {
  const dbRef = ref(database);
  const response = await get(child(dbRef, `products/`));
  if (response.exists()) {
    return response.val();
  } else {
    throw new Error("No user exists with that email!");
  }
};

export const addProduct = async (name, price, imageUrl) => {
  const newKey = await push(child(ref(database), "products")).key;
  const updates = {};
  updates["/products/" + newKey] = { id: newKey, name, price, imageUrl };
  update(ref(database), updates);
  return newKey;
};

export const editProduct = async (product) => {
  const updates = {};
  updates["/products/" + product.id] = product;
  update(ref(database), updates);
};

export const deleteProduct = async (prodId) => {
  const result = await remove(ref(database, "products/" + prodId));
  return result;
};

// Auth Functions
export const signUpUser = async (email, password) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result;
  } catch (err) {
    if (err.code === "auth/email-already-in-use")
      throw new Error("This email is already in use!");
    else if (err.code === "auth/invalid-email")
      throw new Error("Please enter a valid email!");
    else throw err;
  }
};

export const signInUser = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result;
  } catch (err) {
    if (
      err.code === "auth/user-not-found" ||
      err.code === "auth/wrong-password"
    )
      throw new Error("Invalid email or password!");
    else throw err;
  }
};

export const logoutUser = () => {
  signOut(auth).then((result) => console.log(result));
};
