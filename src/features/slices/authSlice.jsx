import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios.config";

let initialState = {
  user: JSON.parse(window.localStorage.getItem("user")) || {
    name: "",
    email: "",
    phone: "",
    county: "",
    subcounty: "",
    courier: "",
  },
  authUser: window.localStorage.getItem("user") != null,
  loginError: "",
  registerError: "",
  profileError: "",
};

export const login = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      let { email, password } = payload;
      let res = await axios.post("/login", { email, password });

      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      let res = await axios.post("/register", payload);

      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (payload, { rejectWithValue }) => {
    try {
      let res = await axios.post("/profile/update", payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = {
        name: "",
        password: "",
        image: "",
      };
      state.authUser = false;
      localStorage.clear();
      sessionStorage.clear();
    },
    updatePassword() {},
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoggingIn = true;
      state.loginError = "";
      state.registerError = "";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      const res = action.payload;
      if (res.success) {
        state.error = "";
        state.user = res.data;
        window.localStorage.setItem("token", res.accessToken);
        state.authUser = true;
        window.localStorage.setItem("user", JSON.stringify(state.user));
      } else {
        state.loginError = "Invalid Credentials";
        state.authUser = false;
      }
      state.isLoggingIn = false;
    });
    builder.addCase(login.rejected, (state) => {
      state.isLoggingIn = false;
      state.loginError = "Invalid Credentials";
    });

    builder.addCase(updateProfile.pending, (state, action) => {
      state.isUpdating = true;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      const res = action.payload;
      if (res.success) {
        state.error = "";
        state.user.name = res.data.name;
        state.user.email = res.data.email;
        state.user.phone = res.data.phone;
        state.authUser = true;
        window.localStorage.setItem("user", JSON.stringify(state.user));
      }
      state.isUpdating = false;
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      if (action.payload.response.status === 403) {
        state.user = {
          name: "",
          password: "",
          image: "",
        };
        state.authUser = false;
        localStorage.clear();
        sessionStorage.clear();
      }
    });
    builder.addCase(register.pending, (state) => {
      state.isRegistering = true;
      state.loginError = "";
      state.registerError = "";
    });
    builder.addCase(register.fulfilled, (state, action) => {
      const res = action.payload;

      if (res.success) {
        state.error = "";
        state.user = res.data;
        window.localStorage.setItem("token", res.accessToken);
        state.user.authUser = true;
        window.localStorage.setItem("user", JSON.stringify(state.user));
      } else {
        state.registerError = res.message || "Email already in use";
        state.user.authUser = false;
      }
      state.isRegistering = false;
    });
    builder.addCase(register.rejected, (state) => {
      state.isRegistering = false;
      state.registerError = "Email has already been used";
    });
    builder.addCase("cart/addToCart/rejected", (state, action) => {
      if (action.payload.response.status === 403) {
        state.authUser = false;
        state.user = {
          name: "",
          password: "",
          image: "",
        };
        localStorage.clear();
        sessionStorage.clear();
      }
    });
    builder.addCase("cart/checkout/rejected", (state, action) => {
      if (action.payload.response.status === 403) {
        state.authUser = false;
        state.user = {
          name: "",
          password: "",
          image: "",
        };
        localStorage.clear();
        sessionStorage.clear();
      }
    });
    builder.addCase("cart/getCheckoutInfo/rejected", (state, action) => {
      if (action.payload.response.status === 403) {
        state.authUser = false;
        state.user = {
          name: "",
          password: "",
          image: "",
        };
        localStorage.clear();
        sessionStorage.clear();
      }
    });
  },
});

export const { logout, updatePassword } = authSlice.actions;
export default authSlice.reducer;
