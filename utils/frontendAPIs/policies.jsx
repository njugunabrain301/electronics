import axios, { URL } from "./axios.config";

export const requestReturn = async (payload) => {
  try {
    let res = await axios.post("/return", payload);
    return res.data;
  } catch (err) {
    return err;
  }
};
