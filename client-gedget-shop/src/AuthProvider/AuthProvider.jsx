import { createContext, useEffect, useState } from "react";
import { app } from "../firebase-config/firebase.config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signOut,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state
  const [loading, setLoading] = useState(true); // Loading state
  const googleProvider = new GoogleAuthProvider(); // Google Auth provider

  // Function to create a new user
  const CreateUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Function to log in with email and password
  const Login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Function to log out
  const Logout = () => {
    return signOut(auth);
  };

  // Function for Google login
  const GoogleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // Monitor authentication state changes (user login, logout, etc.)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set the current user
      setLoading(false); // Stop loading once user is set
      console.log(currentUser);
    });

    // Cleanup function to unsubscribe from the auth listener
    return () => {
      return unsubscribe;
    };
  }, []); // Empty dependency array to run only once on mount

  // Context value shared with children
  const authInfo = {
    user,
    loading,
    CreateUser,
    Login,
    Logout,
    GoogleLogin,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children} {/* Render children components that consume the context */}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
