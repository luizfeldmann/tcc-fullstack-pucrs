import axios from "axios";
import { API_URL } from "./constants.ts";

/** Common client used for API calls in the application */
export const appAxios = axios.create({
  baseURL: `${API_URL}/`,
});

/** Generates the authorization header */
export const useAuthorization = (token: string) => {
  return {
    Authorization: `Bearer ${token}`,
  };
};
