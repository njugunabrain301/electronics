import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios.config";

let initialState = {
  profile: JSON.parse(localStorage.getItem("business")) || {},
};

export const fetchBusinessProfile = createAsyncThunk(
  "business/profile",
  async (payload, { rejectWithValue }) => {
    try {
      let res = await axios.get("/business/profile");
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const appSlice = createSlice({
  name: "business",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchBusinessProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBusinessProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.success) {
        state.profile = action.payload.data;
      }
    });
    builder.addCase(fetchBusinessProfile.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default appSlice.reducer;
