import {createContext, ReactNode, useState} from "react";
import PropTypes from "prop-types";

const STORAGE_KEY = "token";

export const AuthContext = createContext<ContextData | null>(null);

type Props = {
  children: ReactNode
}

type ContextData = {
  token: string | null,
  authorized: boolean,
  login: (token: string) => void,
  logout: () => void,
}

export const AuthContextProvider = ({ children }: Props) => {
  const [token, setToken] = useState(() => {
    const existingToken = localStorage.getItem(STORAGE_KEY);
    return existingToken || null;
  });

  const login = (token: string) => {
    setToken(token);
    localStorage.setItem(STORAGE_KEY, token);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem(STORAGE_KEY);
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
