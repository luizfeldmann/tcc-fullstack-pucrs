import { createContext, useCallback, useContext, useState } from "react";

/** Key of the storage item used for auth */
const autoLocalStorageName = "user-auth";

/** Object returned by the authentication hook */
export interface IAuthHook {
  /** When logged-in, the token */
  token?: string;

  /** Callback used to set the current log-in user*/
  doLogin: (token: string) => void;

  /** Callback used to logoff the current user */
  doLogoff: () => void;
}

/** Implements persistent storage of the authentication state */
export const useAuth = (): IAuthHook => {
  // Initialize the state by reading from browser local storage
  const [state, setState] = useState<string | undefined>(() => {
    const readStorage = localStorage.getItem(autoLocalStorageName);
    return readStorage ? readStorage : undefined;
  });

  // Callback to assign a new token to perform the login
  const doLogin = useCallback(
    (token: string) => {
      localStorage.setItem(autoLocalStorageName, token);
      setState(token);
    },
    [setState]
  );

  // Callback to remove the authentication
  const doLogoff = useCallback(() => {
    localStorage.removeItem(autoLocalStorageName);
    setState(undefined);
  }, [setState]);

  return { token: state, doLogin, doLogoff };
};

/** Context used to read the authentication */
export const AuthContext = createContext<string | undefined>(undefined);

/** Reads the authentication token from the context */
export const useAuthContext = () => {
  return useContext(AuthContext);
};
