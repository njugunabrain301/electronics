import { fetchData } from "./fetch.config";

export const getCheckoutInfo = async () => {
  try {
    let res = await fetchData("/checkoutinfo");
    return res;
  } catch (err) {
    return err;
  }
};

export const runtime = "edge";
