import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import productSlice from "./product-slice";

// The index file where all slices are combined

const store = configureStore({
  reducer: { auth: authSlice, product: productSlice },
});

export default store;
