import axios from "axios";
import { bid } from "../store";

let production = process.env.REACT_APP_PRODUCTION;
const baseURL =
  production === "true"
    ? "https://red-courageous-sockeye.cyclic.app/user/zidika"
    : "http://localhost:3001/user/zidika";
let instance = axios.create({
  baseURL,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    config.headers["business"] = bid;
    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
