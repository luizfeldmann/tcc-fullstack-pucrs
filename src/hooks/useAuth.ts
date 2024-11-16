import { useCallback, useEffect, useState } from "react";
import { z } from "zod";

/** Schema to validate and parse the authentication data */
const authSchema = z.object({
  token: z.string(),
});

/** Type of the authentication data object */
type IAuthData = z.infer<typeof authSchema>;

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
  const [state, setState] = useState<IAuthData | undefined>(() => {
    const readStorage = localStorage.getItem(autoLocalStorageName);
    return readStorage
      ? authSchema.safeParse(JSON.parse(readStorage)).data
      : undefined;
  });

  // Every time the state changes, save it to the browser
  useEffect(() => {
    if (state) {
      localStorage.setItem(autoLocalStorageName, JSON.stringify(state));
    } else {
      localStorage.removeItem(autoLocalStorageName);
    }
  }, [state]);

  // Callback to assign a new token to perform the login
  const doLogin = useCallback(
    (token: string) => {
      setState({
        token: token,
      });
    },
    [setState]
  );

  // Callback to remove the authentication
  const doLogoff = useCallback(() => {
    setState(undefined);
  }, [setState]);

  // When logged in, contains the user's token
  const token = state?.token;

  return { token, doLogin, doLogoff };
};
