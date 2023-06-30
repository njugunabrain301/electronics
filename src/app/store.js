import { configureStore } from "@reduxjs/toolkit";
import slideReducer from "../features/slices/sliderSlice";
import productsReducer from "../features/slices/productsSlice";
import cartReducer from "../features/slices/cartSlice";
import authReducer from "../features/slices/authSlice";
import ordersReducer from "../features/slices/ordersSlice";
import appReducer from "../features/slices/appSlice";

export const store = configureStore({
  reducer: {
    slider: slideReducer,
    products: productsReducer,
    cart: cartReducer,
    user: authReducer,
    orders: ordersReducer,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "auth/login/rejected",
          "auth/register/rejected",
          "auth/updateProfile/rejected",
          "cart/checkout/rejected",
          "cart/getCheckoutInfo/rejected",
          "cart/addToCart/rejected",
        ],
      },
    }),
});

export const bid = "64918220954f3056bf6dcc5e";
