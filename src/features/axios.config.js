import axios from "axios";
import { bid } from "../app/store";

let instance = axios.create({
  // baseURL: "https://red-courageous-sockeye.cyclic.app",
  baseURL: "http://localhost:3001/user/zidika",
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
