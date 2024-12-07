"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

/** Key of the storage item used for auth */
const autoLocalStorageName = "user-auth";

/** Functions available to manage the log-in state */
export interface IAuthController {
  doLogin: (token: string) => void;
  doLogout: () => void;
  token: string | undefined;
}

/** Context used to read the authentication */
const AuthContext = createContext<IAuthController | undefined>(undefined);

/** Reads the authentication token from the context */
export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = (props: { children: React.ReactNode }) => {
  // Initialize the state by reading from browser local storage
  const [token, setToken] = useState<string | undefined>();

  useEffect(() => {
    const readStorage = localStorage.getItem(autoLocalStorageName);
    if (readStorage) setToken(readStorage);
  }, [setToken]);

  const doLogin = useCallback(
    (token: string) => {
      localStorage.setItem(autoLocalStorageName, token);
      setToken(token);
    },
    [setToken]
  );

  // Callback to remove the authentication
  const doLogout = useCallback(() => {
    localStorage.removeItem(autoLocalStorageName);
    setToken(undefined);
  }, [setToken]);

  return (
    <AuthContext.Provider value={{ doLogin, doLogout, token }}>
      {props.children}
    </AuthContext.Provider>
  );
};
