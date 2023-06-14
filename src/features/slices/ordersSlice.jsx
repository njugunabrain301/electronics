import { createSlice } from "@reduxjs/toolkit";
import { storeData } from "../../assets/data/dummyData";

export const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: storeData,
    error: false,
  },
  reducers: {
    getOrders(state, action) {
      try {
        const filter = storeData;
        state.orders = filter;
        state.error = false;
      } catch (err) {
        return err;
      }
    },
  },
});

export const { getOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
