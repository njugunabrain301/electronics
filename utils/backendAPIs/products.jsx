import axios from "./axios.config";
import { fetchData } from "./fetch.config";

export const fetchProducts = async () => {
  try {
    let res = await fetchData("/products");
    return res;
  } catch (err) {
    return err;
  }
};

export const fetchProduct = async (payload) => {
  try {
    let res = await fetchData("/product/" + payload.pid);
    return res;
  } catch (err) {
    return err;
  }
};

export const fetchHomePage = async () => {
  try {
    let res = await axios.get("/homepage");
    return res.data;
  } catch (err) {
    return err;
  }
};

export const fetchCategories = async () => {
  try {
    let res = await fetchData("/categories");
    return res;
  } catch (err) {
    return err;
  }
};

export const fetchGenderizable = async () => {
  try {
    let res = await fetchData("/genderizable");
    return res;
  } catch (err) {
    return err;
  }
};

export const fetchWearables = async () => {
  try {
    let res = await fetchData("/wearables");
    return res;
  } catch (err) {
    return err;
  }
};

export const runtime = "edge";
