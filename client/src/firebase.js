// Firebase client configuration for WanderLust.
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCIz1XqAWUyAGZ_oJ8D9jmJR-mfpJ_GW0w",
  authDomain: "anderlust-37f1b.firebaseapp.com",
  projectId: "anderlust-37f1b",
  storageBucket: "anderlust-37f1b.firebasestorage.app",
  messagingSenderId: "625442442709",
  appId: "1:625442442709:web:b5f5529c170d5bff5f815c",
  measurementId: "G-10T3R2DGCM",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;
