import axios from "./axios.config";

let initialState = {
  filteredProducts: [], // JSON.parse(sessionStorage.getItem("filteredData")) || [],
  products: [] /*
    sessionStorage.getItem("products") &&
    sessionStorage.getItem("products") !== "undefined"
      ? JSON.parse(sessionStorage.getItem("products")) || []
      : [],*/,

  singleProduct: [], //JSON.parse(sessionStorage.getItem("singleProduct")) || [],
  error: false,
  filters: [],
  batchNo: 0,
  sliderData: [],
  isSliderLoaded: false,
  promoted: [],
  categories: [],
  wearables: [],
  filterType: "", //sessionStorage.getItem("filterType") || "",
  isProductsLoading: false,
  selectedProduct: "", //sessionStorage.getItem("selectedProduct") || "",
  search: "", //sessionStorage.getItem("searchFilter") || "",
};

export const fetchProducts = async () => {
  try {
    let res = await axios.get("/products");
    return res.data;
  } catch (err) {
    return err;
  }
};

export const fetchProduct = async (payload) => {
  try {
    let res = await axios.get("/product/" + payload.pid, payload);
    return res.data;
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
    let res = await axios.get("/categories");
    return res.data;
  } catch (err) {
    return err;
  }
};

export const fetchGenderizable = async () => {
  try {
    let res = await axios.get("/genderizable");
    return res;
  } catch (err) {
    return err;
  }
};

export const fetchWearables = async () => {
  try {
    let res = await axios.get("/wearables");
    return res.data;
  } catch (err) {
    return err;
  }
};
