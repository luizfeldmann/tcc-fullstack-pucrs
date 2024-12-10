import axios from "axios";

/** Common client used for API calls in the application */
export const appAxios = axios.create({
  baseURL: "/api",
});

/** Generates the authorization header */
export const withAuthorizationHeader = (token: string) => {
  return {
    Authorization: `Bearer ${token}`,
  };
};
