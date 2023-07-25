import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios.config";

let initialState = {
  profile: JSON.parse(localStorage.getItem("business")) || {},
  theme: {
    textPrimary: "black",
    textSecondary: "white",
    textAlt: "gray",
    backgroundPrimary: "white",
    backgroundSecondary: "black",
    backgroundAlt: "blue",
    accent1: "",
    accent2: "",
    accent3: "",
    accent4: "",
  },
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

export const visit = createAsyncThunk("business/visit", async () => {
  try {
    await axios.post("/visit");
  } catch (err) {}
});

export const appSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
    },
  },

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

export const { setTheme } = appSlice.actions;
export default appSlice.reducer;
