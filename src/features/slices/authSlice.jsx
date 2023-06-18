import { createSlice } from "@reduxjs/toolkit";

const users = [
  {
    email: "jb@mail.com",
    password: "1234",
    name: "John Brian",
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
    error: "",
  },
  reducers: {
    login(state, action) {
      const userId = action.payload;

      if (userId.email.length > 0 && userId.password.length > 0) {
        const user = users.filter(
          (u) => u.email === userId.email && u.password === userId.password
        );
        state.error = "";
        if (user.length === 1) {
          state.user = user[0];
          state.user.authUser = true;
          const saveState = JSON.stringify(state.user);
          sessionStorage.setItem("authUser", saveState);
          userId.closeModal();
        } else {
          state.error = "Invalid Credentials";
          state.user.authUser = false;
        }
      } else {
        state.error = "Fill in all fields";
        state.user.authUser = false;
      }
    },
    register(state, action) {
      const userId = action.payload;

      if (
        userId.email.length > 0 &&
        userId.password.length > 0 &&
        userId.name.length > 0
      ) {
        if (userId.agreed) {
          state.error = "";
          const user = {
            email: userId.email,
            password: userId.password,
            name: userId.name,
          };
          users.push(user);

          state.user = user;
          state.user.authUser = true;
          const saveState = JSON.stringify(state.user);
          sessionStorage.setItem("authUser", saveState);
          userId.closeModal();
        } else {
          state.error = "You need to agree to the Terms";
          state.user.authUser = false;
        }
      } else {
        state.error = "Fill in all fields";
        state.user.authUser = false;
      }
    },
    updateProfile(state, action) {
      const userId = action.payload;

      if (
        userId.email.length > 0 &&
        userId.password.length > 0 &&
        userId.name.length > 0
      ) {
        state.error = "";
        const user = {
          email: userId.email,
          password: userId.password,
          name: userId.name,
        };
        users.push(user);

        state.user = user;
        state.user.authUser = true;
        const saveState = JSON.stringify(state.user);
        sessionStorage.setItem("authUser", saveState);
        userId.closeModal();
      } else {
        state.error = "Fill in all fields";
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
    updatePassword() {},
  },
});

export const { login, logout, register, updateProfile, updatePassword } =
  authSlice.actions;
export default authSlice.reducer;
