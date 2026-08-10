import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { AuthAPI } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [profile, setProfile] = useState(null); // { uid, email, name, role } from our DB
  const [loading, setLoading] = useState(true);

  async function syncProfile() {
    try {
      const { user } = await AuthAPI.sync();
      setProfile(user);
    } catch (err) {
      console.error("Failed to sync profile with server:", err.message);
      setProfile(null);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await syncProfile();
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  async function signup(name, email, password) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (name) await updateProfile(cred.user, { displayName: name });
    await syncProfile();
    return cred.user;
  }

  async function login(email, password) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    await syncProfile();
    return cred.user;
  }

  async function loginWithGoogle() {
    const cred = await signInWithPopup(auth, googleProvider);
    await syncProfile();
    return cred.user;
  }

  function logout() {
    setProfile(null);
    return signOut(auth);
  }

  const value = {
    currentUser,
    profile,
    isAdmin: profile?.role === "admin",
    loading,
    signup,
    login,
    loginWithGoogle,
    logout,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
