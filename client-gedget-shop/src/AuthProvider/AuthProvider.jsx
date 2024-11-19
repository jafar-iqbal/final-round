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
import axios from "axios";
export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state
  const [loading, setLoading] = useState(true); // Loading state
  const googleProvider = new GoogleAuthProvider(); // Google Auth provider

  // Function to create a new user
  const CreateUser = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential;
    } catch (error) {
      console.error("Error creating user: ", error);
      throw error; // You can handle it in the component where this function is called
    }
  };

  // Function to log in with email and password
  const Login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential;
    } catch (error) {
      console.error("Error logging in: ", error);
      throw error; // You can handle it in the component where this function is called
    }
  };

  // Function to log out
  const Logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  // Function for Google login
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result;
    } catch (error) {
      console.error("Error with Google login: ", error);
      throw error;
    }
  };

  // Monitor authentication state changes (user login, logout, etc.)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set the current user
      if (currentUser) {
        axios
          .post(`http://localhost:4000/authentication`, {
            email: currentUser.email,
          })
          .then((data) => {
            if (data.data) {
              localStorage.setItem("access-token", data?.data?.token);
              setLoading(false);
            }
          });
      }
      localStorage.removeItem("access-token");
      setLoading(false); // Stop loading once user is set
      // Optionally remove the console.log for production:
      console.log(currentUser);
    });

    // Cleanup function to unsubscribe from the auth listener
    return unsubscribe;
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
