import { fetchData } from "./fetch.config";

export const fetchBusinessProfile = async () => {
  try {
    let res = await fetchData("/business/profile");
    return res;
  } catch (err) {
    return err;
  }
};

export const runtime = "edge";
