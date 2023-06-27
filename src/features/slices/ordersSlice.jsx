import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios.config";

let initialState = {
  orders: [],
  error: false,
};

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (payload, { rejectWithValue }) => {
    try {
      let res = await axios.get("/orders");
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.success) {
        state.orders = action.payload.data;
      }
    });
    builder.addCase(fetchOrders.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const {} = ordersSlice.actions;
export default ordersSlice.reducer;
