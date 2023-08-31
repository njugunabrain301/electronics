import axios from "./axios.config";

export const getCheckoutInfo = async () => {
  try {
    let res = await axios.get("/checkoutinfo");
    return res.data;
  } catch (err) {
    return err;
  }
};
