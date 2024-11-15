import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to store the current user
  const [loading, setLoading] = useState(true); // Loader to show while checking authentication

  useEffect(() => {
    // Listen for authentication state changes
    const unSubscribed = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set the user object when authentication state changes
      setLoading(false); // Once state is set, stop the loader
    });

    return () => unSubscribed(); // Clean up the subscription when the component unmounts
  }, []);

  // Create user (Sign-up)
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Sign-in user
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Log out
  const logOut = () => {
    return signOut(auth);
  };

  // Update user profile (e.g., name)
  const updateUser = (userInfo) => {
    return updateProfile(auth.currentUser, userInfo);
  };

  const authInfo = {
    user, // Make user available in context
    createUser,
    signIn,
    logOut,
    updateUser,
    loading,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
