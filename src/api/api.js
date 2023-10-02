import axios from "axios";

export const IBDirectAPI = axios.create({
  baseURL: "http://127.0.0.1:5022/api",
});
