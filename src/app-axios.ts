import axios from "axios";
import { API_URL } from "./constants.ts";

export const appAxios = axios.create({
  baseURL: `${API_URL}/`,
});
