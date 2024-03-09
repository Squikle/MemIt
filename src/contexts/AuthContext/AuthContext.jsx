import { createContext, useState } from "react";
import PropTypes from "prop-types";

const STORAGE_KEY = "token";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const existingToken = localStorage.getItem(STORAGE_KEY);
    return existingToken || null;
  });

  const login = (token) => {
    setToken(token);
    localStorage.setItem(STORAGE_KEY, token);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear(STORAGE_KEY);
  };

  const contextValue = {
    token,
    authorized: !!token,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};
