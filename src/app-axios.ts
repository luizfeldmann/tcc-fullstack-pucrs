import axios from "axios";
import { API_URL } from "./constants.ts";

/** Common client used for API calls in the application */
export const appAxios = axios.create({
  baseURL: `${API_URL}/`,
});
