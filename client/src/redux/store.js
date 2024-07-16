import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { authSlice } from "./slices/authSlice";
import { paymentSlice } from "./slices/paymentSlice";
import { cartSlice } from "./slices/cartSlice";
import { productSlice } from "./slices/productSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice.reducer,
    payment: paymentSlice.reducer,
    cart: cartSlice.reducer,
    product: productSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
