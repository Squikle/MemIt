import { AuthContext } from "./AuthContext.tsx";
import { useContext } from "react";

export function useAuthContext() {
  const value = useContext(AuthContext);

  if (value == null)
    throw new Error("Should be within AuthContextProvider");

  return value;
}
