import axios from "./axios.config";

export const fetchOrders = async () => {
  try {
    let res = await axios.get("/orders");
    return res.data;
  } catch (err) {
    return err;
  }
};
