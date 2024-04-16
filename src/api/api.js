import axios from "axios";
const API_URL = import.meta.env.VITE_APP_API_URL;

export const IBDirectAPI = axios.create({
  baseURL: API_URL,
});
