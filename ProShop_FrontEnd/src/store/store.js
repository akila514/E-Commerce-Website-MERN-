import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { cartReducer } from "./cartSlice";
import { authReducer } from "./authSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
