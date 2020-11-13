import React, { useEffect, useState, createContext } from 'react';
import app from '../firebase/config';
import Loader from '../components/Loader';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
