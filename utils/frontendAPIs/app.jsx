import axios from "./axios.config";

export const visit = async () => {
  try {
    await axios.post("/visit");
  } catch (err) {}
};
