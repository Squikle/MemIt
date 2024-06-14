import {createContext, ReactNode, useState} from "react";
import {useDispatch} from "react-redux";
import {RootActions} from "@/store/rootReducer.ts";

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
  const dispatch = useDispatch();

  const login = (token: string) => {
    setToken(token);
    localStorage.setItem(STORAGE_KEY, token);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem(STORAGE_KEY);
    const action: {type: RootActions} = {type: "Logout"};
    dispatch(action);
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
