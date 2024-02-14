import { fetchData } from "./fetch.config";

export const fetchReturnsPolicy = async () => {
  try {
    let res = await fetchData("/business/policy/returns");

    return res;
  } catch (err) {
    return err;
  }
};

export const fetchShippingPolicy = async () => {
  try {
    let res = await fetchData("/business/policy/shipping");

    return res;
  } catch (err) {
    return err;
  }
};

export const runtime = "edge";
