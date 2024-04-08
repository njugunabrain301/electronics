import axios from "./axios.config";

export const visit = async (payload) => {
  try {
    await axios.post("/visit", payload);
  } catch (err) {}
};

export const inquire = async () => {
  try {
    let res = await axios.post("/inquire");
    return res.data;
  } catch (err) {}
};

export const sendMessage = async (payload) => {
  try {
    let res = await axios.post("/message", payload);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const lead = async (payload) => {
  try {
    let res = await axios.post("/lead", payload);
    return res.data;
  } catch (err) {
    return err;
  }
};
