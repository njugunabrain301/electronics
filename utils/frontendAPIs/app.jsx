import axios from "./axios.config";

export const visit = async () => {
  try {
    await axios.post("/visit");
  } catch (err) {}
};

export const inquire = async () => {
  try {
    let res = await axios.post("/inquire");
    return res.data;
  } catch (err) {}
};
