"use client";
import axios from "./axios.config";

export const addToCart = async (payload) => {
  try {
    let res = await axios.post("/cart/add", payload);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const removeFromCart = async (payload) => {
  try {
    let res = await axios.post("/cart/remove", payload);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const checkout = async (payload) => {
  try {
    let res = await axios.post("/checkout", payload);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const anonymousCheckout = async (payload) => {
  try {
    let res = await axios.post("/checkout/anonymous", payload);
    return res.data;
  } catch (err) {
    return err;
  }
};
