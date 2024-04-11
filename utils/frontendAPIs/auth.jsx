import axios from "./axios.config";

export const login = async (payload) => {
  try {
    let { email, password } = payload;
    let res = await axios.post("/login", { email, password });

    return res.data;
  } catch (err) {
    return err;
  }
};

export const verifyAuth = async () => {
  try {
    let res = await axios.get("/verify-auth");

    return res.data;
  } catch (err) {
    return err;
  }
};

export const register = async (payload) => {
  try {
    let res = await axios.post("/register", payload);

    return res.data;
  } catch (err) {
    return err;
  }
};

export const updateProfile = async (payload) => {
  try {
    let res = await axios.post("/profile/update", payload);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const deleteProfile = async (payload) => {
  try {
    let res = await axios.delete("/profile", payload);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const resetPassword = async (payload) => {
  try {
    let res = await axios.post("/reset-password", payload);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const resetPasswordLink = async (payload) => {
  try {
    let res = await axios.post("/request-reset-password", payload);
    return res.data;
  } catch (err) {
    return err;
  }
};
