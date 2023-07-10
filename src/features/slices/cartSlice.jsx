import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios.config";

let initialState = {
  cart: JSON.parse(window.localStorage.getItem("cart")) || [],
  amount: window.localStorage.getItem("cart-amount") || 0,
  totalAmount: window.localStorage.getItem("cart-total-amt") || 0,
  totalPrice: window.localStorage.getItem("cart-total-price") || 0,
  isAddingToCart: false,
  isCheckingOut: false,
  counties: [],
  deliveryLocations: [],
  paymentOptions: [],
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (payload, { rejectWithValue }) => {
    try {
      let res = await axios.post("/cart/add", payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (payload, { rejectWithValue }) => {
    try {
      let res = await axios.post("/cart/remove", payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const checkout = createAsyncThunk(
  "cart/checkout",
  async (payload, { rejectWithValue }) => {
    try {
      let res = await axios.post("/checkout", payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getCheckoutInfo = createAsyncThunk(
  "cart/getCheckoutInfo",
  async (payload, { rejectWithValue }) => {
    try {
      let res = await axios.get("/checkoutinfo");
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase("auth/login/fulfilled", (state, action) => {
      if (action.payload.success) {
        state.cart = action.payload.data.cart;
        state.totalAmount = 0;
        state.totalPrice = 0;
        state.cart.map((item) => {
          state.totalAmount += item.amount;
          item.totalPrice = item.amount * item.price;
          state.totalPrice += item.totalPrice;
          return item;
        });
        window.localStorage.setItem("cart", JSON.stringify(state.cart));
        window.localStorage.setItem("cart-amount", state.amount);
        window.localStorage.setItem("cart-total-amt", state.totalAmount);
        window.localStorage.setItem("cart-total-price", state.totalPrice);
      }
    });

    builder.addCase(addToCart.pending, (state) => {
      state.isAddingToCart = true;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.isAddingToCart = false;
      if (action.payload.success) {
        state.cart = action.payload.data;
        state.totalAmount = 0;
        state.totalPrice = 0;
        state.cart.foreach((item) => {
          state.totalAmount += item.amount;
          item.totalPrice = item.amount * item.price;
          state.totalPrice += item.totalPrice;
        });
        window.localStorage.setItem("cart", JSON.stringify(state.cart));
        window.localStorage.setItem("cart-amount", state.amount);
        window.localStorage.setItem("cart-total-amt", state.totalAmount);
        window.localStorage.setItem("cart-total-price", state.totalPrice);
      }
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.isAddingToCart = false;
      if (action.payload.response.status === 403) {
        state.cart = [];
        state.totalAmount = 0;
        state.totalPrice = 0;
      }
    });

    builder.addCase(removeFromCart.pending, (state, action) => {});
    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.cart = action.payload.data;
        state.totalAmount = 0;
        state.totalPrice = 0;
        state.cart.foreach((item) => {
          state.totalAmount += item.amount;
          item.totalPrice = item.amount * item.price;
          state.totalPrice += item.totalPrice;
        });
        window.localStorage.setItem("cart", JSON.stringify(state.cart));
        window.localStorage.setItem("cart-amount", state.amount);
        window.localStorage.setItem("cart-total-amt", state.totalAmount);
        window.localStorage.setItem("cart-total-price", state.totalPrice);
      }
    });

    builder.addCase(checkout.pending, (state) => {
      state.isCheckingOut = true;
    });
    builder.addCase(checkout.fulfilled, (state, action) => {
      state.isCheckingOut = true;
      if (action.payload.success) {
        state.cart = [];
        state.totalAmount = 0;
        state.totalPrice = 0;
        state.cart.foreach((item) => {
          state.totalAmount += item.amount;
          item.totalPrice = item.amount * item.price;
          state.totalPrice += item.totalPrice;
        });
        window.localStorage.setItem("cart", JSON.stringify(state.cart));
        window.localStorage.setItem("cart-amount", state.amount);
        window.localStorage.setItem("cart-total-amt", state.totalAmount);
        window.localStorage.setItem("cart-total-price", state.totalPrice);
      }
    });
    builder.addCase(checkout.rejected, (state, action) => {
      state.isCheckingOut = false;
      if (action.payload.response.status === 403) {
        state.cart = [];
        state.totalAmount = 0;
        state.totalPrice = 0;
      }
    });

    builder.addCase(getCheckoutInfo.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.paymentOptions = action.payload.data.paymentOptions;
        state.deliveryLocations = action.payload.data.deliveryLocations;

        state.counties = [];
        state.deliveryLocations.map((loc) => {
          if (!state.counties.includes(loc.county))
            state.counties.push(loc.county);
          return loc;
        });
      }
    });

    builder.addCase(getCheckoutInfo.rejected, (state, action) => {
      if (action.payload.response.status === 403) {
        state.cart = [];
        state.totalAmount = 0;
        state.totalPrice = 0;
      }
    });

    builder.addCase("auth/logout", (state) => {
      state.cart = [];
      state.totalAmount = 0;
      state.totalPrice = 0;
    });
    builder.addCase("auth/updateProfile/rejected", (state, action) => {
      if (action.payload.response.status === 403) {
        state.cart = [];
        state.totalAmount = 0;
        state.totalPrice = 0;
      }
    });
  },
});

export default cartSlice.reducer;
