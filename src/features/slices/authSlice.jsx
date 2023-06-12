import { createSlice } from "@reduxjs/toolkit";

const users = [
  {
    email: "jb@mail.com",
    password: "1234",
    fname: "John",
    lname: "brian",
  },
];

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(sessionStorage.getItem("authUser")) || {
      name: "",
      password: "",
      image: "",
      authUser: false,
    },
    error: false,
  },
  reducers: {
    login(state, action) {
      const userId = action.payload;

      const user = users.filter(
        (u) => u.email === userId.email && u.password === userId.password
      );
      state.error = false;
      if (user.length === 1) {
        state.user = user[0];
        state.user.authUser = true;
        const saveState = JSON.stringify(state.user);
        sessionStorage.setItem("authUser", saveState);
      } else {
        state.error = true;
        state.user.authUser = false;
      }
    },
    logout(state) {
      state.user = {
        name: "",
        password: "",
        image: "",
        authUser: false,
      };
      sessionStorage.clear();
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
