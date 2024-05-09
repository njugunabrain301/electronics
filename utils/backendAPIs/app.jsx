import { fetchData } from "./fetch.config";

export const fetchBusinessProfile = async () => {
  try {
    let res = await fetchData("/business/profile");

    return res;
  } catch (err) {
    return err;
  }
};

export const fetchAboutUs = async () => {
  try {
    let res = await fetchData("/business/about");

    return res;
  } catch (err) {
    return err;
  }
};

export const fetchContactUs = async () => {
  try {
    let res = await fetchData("/business/contact");

    return res;
  } catch (err) {
    return err;
  }
};

export const fetchPOSInvoice = async (data) => {
  try {
    let res = await fetchData("/posInvoice/" + data);

    return res;
  } catch (err) {
    return err;
  }
};

export const runtime = "edge";
