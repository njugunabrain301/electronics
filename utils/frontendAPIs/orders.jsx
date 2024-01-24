import axios, { URL } from "./axios.config";

export const fetchOrders = async () => {
  try {
    let res = await axios.get("/orders");
    return res.data;
  } catch (err) {
    return err;
  }
};

export const downloadReceipt = async (iid) => {
  try {
    let res = await axios.get("/receipt/" + iid);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const downloadURL = URL + "/receipt";
