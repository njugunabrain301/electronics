import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { storeData } from "../../assets/data/kitchenWareData";
import axios from "../axios.config";

let initialState = {
  filteredProducts: JSON.parse(sessionStorage.getItem("filteredData")) || [],
  products: sessionStorage.getItem("products")
    ? JSON.parse(sessionStorage.getItem("products")) || []
    : [],

  singleProduct: JSON.parse(sessionStorage.getItem("singleProduct")) || [],
  error: false,
  filters: [],
  batchNo: 0,
  sliderData: [],
  isSliderLoaded: false,
  promoted: [],
  categories: [],
  wearables: [],
  filterType: sessionStorage.getItem("filterType") || "",
  isProductsLoading: false,
  selectedProduct: sessionStorage.getItem("selectedProduct") || "",
  search: sessionStorage.getItem("searchFilter") || "",
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (payload, { rejectWithValue }) => {
    try {
      let res = await axios.get("/products");
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchHomePage = createAsyncThunk(
  "products/fetchHomePage",
  async (payload, { rejectWithValue }) => {
    try {
      let res = await axios.get("/homepage");
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async (payload, { rejectWithValue }) => {
    try {
      let res = await axios.get("/categories");
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchGenderizable = createAsyncThunk(
  "products/getGenderizable",
  async (_, { rejectWithValue }) => {
    try {
      let res = await axios.get("/genderizable");
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchWearables = createAsyncThunk(
  "products/getWearables",
  async (_, { rejectWithValue }) => {
    try {
      let res = await axios.get("/wearables");
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

let matchFilters = (product, state) => {
  if (
    state.filterType.toLowerCase() !== "search" &&
    product.type.toLowerCase() !== state.filterType.toLowerCase()
  ) {
    return false;
  }
  if (
    state.filters.includes("male") &&
    product.gender.toLowerCase() !== "male" &&
    product.gender.toLowerCase() !== "unisex"
  )
    return false;

  if (
    state.filters.includes("female") &&
    product.gender.toLowerCase() !== "female" &&
    product.gender.toLowerCase() !== "unisex"
  )
    return false;

  if (
    state.filters.includes("unisex") &&
    product.gender.toLowerCase() !== "unisex"
  )
    return false;

  return true;
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    filterProducts(state, action) {
      try {
        const filter = state.products.filter(
          (product) =>
            action.payload.toLowerCase() === "search" ||
            product.type.toLowerCase() === action.payload.toLowerCase()
        );
        state.filterType = action.payload;
        state.filteredProducts = filter;
        state.error = false;
        const savedState = JSON.stringify(filter);
        sessionStorage.setItem("filteredData", savedState);
        sessionStorage.setItem("filterType", action.payload);
        state.filters.length = 0;
      } catch (err) {
        return err;
      }
    },
    singleProduct(state, action) {
      state.selectedProduct = action.payload;
      sessionStorage.setItem("selectedProduct", state.selectedProduct);
    },
    loadSingleProduct(state, action) {
      try {
        let id = state.selectedProduct || action.payload;
        const oneProduct = state.products.filter((product) => {
          return product._id === id;
        });
        state.singleProduct = oneProduct[0];
      } catch (err) {
        return err;
      }
    },
    filterGender(state, action) {
      try {
        if (!state.filters.includes(action.payload)) {
          state.filters.push(action.payload);
        }
        const gender = state.products.filter((product) =>
          matchFilters(product, state)
        );

        state.error = false;
        state.filteredProducts = gender;
        const oneGenderType = gender.length > 0;
        if (oneGenderType) {
          state.error = false;
          const saveState = JSON.stringify(gender);
          sessionStorage.setItem("filteredData", saveState);
        } else {
          state.error = true;
          state.filteredProducts = [];
        }
      } catch (err) {
        return err;
      }
    },
    sortByPrice(state) {
      try {
        const price = state.filteredProducts.sort((a, b) =>
          a.price > b.price ? -1 : 1
        );
        state.filteredProducts = price;
        let count = price.length;
        if (count > 1) {
          const noError = false;
          state.error = noError;
          if (!noError) {
            state.filteredProducts = price;
            const saveState = JSON.stringify(price);
            sessionStorage.setItem("filteredData", saveState);
          }
        } else {
          state.error = true;
          state.filteredProducts = [];
        }
        if (!state.filters.includes("price")) {
          state.filters.push("price");
        }
      } catch (err) {
        return err;
      }
    },
    filterByColor(state, action) {
      try {
        const color = state.filteredProducts.filter((product) =>
          product.color.includes(action.payload)
        );
        state.error = false;
        state.filteredProducts = color;
        if (color.length <= 0) {
          state.error = true;
          state.filteredProducts = [];
        } else {
          state.error = false;
          state.filteredProducts = color;
          const saveState = JSON.stringify(color);
          sessionStorage.setItem("filteredData", saveState);
        }
      } catch (err) {
        return err;
      }
    },
    filterBySize(state, action) {
      try {
        const size = state.filteredProducts.filter((product) =>
          product.size.includes(action.payload)
        );
        state.error = false;
        state.filteredProducts = size;
        if (size.length <= 0) {
          state.error = true;
          state.filteredProducts = [];
        } else {
          state.error = false;
          state.filteredProducts = size;
          const saveState = JSON.stringify(size);
          sessionStorage.setItem("filteredData", saveState);
        }
      } catch (err) {
        return err;
      }
    },
    setSearchFilter(state, action) {
      state.search = action.payload;
      sessionStorage.setItem("searchFilter", action.payload);
    },
    filterSearch(state, action) {
      try {
        let searchTerm = action.payload;
        if (!searchTerm || searchTerm === "") {
          searchTerm = state.search;
        }
        const search = state.products.filter((product) => {
          if (!searchTerm || searchTerm === "") {
            return matchFilters(product, state);
          }
          return (
            matchFilters(product, state) &&
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        });

        state.error = false;
        state.filteredProducts = search;
        const exists = search.length > 0;
        if (exists) {
          state.error = false;
          const saveState = JSON.stringify(search);
          sessionStorage.setItem("filteredData", saveState);
        } else {
          state.error = true;
          state.filteredProducts = [];
        }
      } catch (err) {
        return err;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHomePage.pending, (state) => {
      state.isSliderLoaded = false;
    });
    builder.addCase(fetchHomePage.fulfilled, (state, action) => {
      state.isSliderLoaded = true;
      state.sliderData = action.payload.data.slider;
      state.promoted = action.payload.data.promoted;
      let notLoaded = [];
      state.promoted.map((prod) => {
        let exists = state.products.find((pr) => prod._id === pr._id);
        if (!exists) {
          notLoaded.push(prod);
        }
        return prod;
      });

      state.sliderData.map((prod) => {
        let exists = state.products.find((pr) => prod._id === pr._id);
        if (!exists) {
          notLoaded.push(prod);
        }
        return prod;
      });

      state.products = [...state.products, ...notLoaded];
    });
    builder.addCase(fetchHomePage.rejected, (state) => {
      state.isSliderLoaded = false;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload.data;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload.data;
      sessionStorage.setItem("products", JSON.stringify(state.products));
      const filter = state.products.filter((product) => {
        if (state.filterType)
          return (
            state.filterType.toLowerCase() === "search" ||
            product.type === state.filterType
          );
        return true;
      });
      state.filteredProducts = filter;
    });
    builder.addCase(fetchGenderizable.fulfilled, (state, action) => {
      if (action.payload.data.success)
        state.genderizable = action.payload.data.data;
    });
    builder.addCase(fetchWearables.fulfilled, (state, action) => {
      if (action.payload.data.success)
        state.wearables = action.payload.data.data;
    });
  },
});

export const {
  filterProducts,
  singleProduct,
  filterGender,
  sortByPrice,
  filterByColor,
  filterBySize,
  loadSingleProduct,
  filterSearch,
  setSearchFilter,
} = productSlice.actions;
export default productSlice.reducer;
