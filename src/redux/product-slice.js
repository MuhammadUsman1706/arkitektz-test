import { createSlice } from "@reduxjs/toolkit";

// The product slice that contains data for all products.

const initialState = {
  products: [],
  refreshProducts: true, // In case the products need to be re-fetched.
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    populateProducts(state, action) {
      state.products = action.payload.products;
      state.refreshProducts = false;
    },
    addProduct(state, action) {
      state.products = [...state.products, action.payload.product];
    },
    editProduct(state, action) {
      const id = action.payload.product.id;
      const index = state.products.findIndex((product) => product.id === id);
      const updatedProducts = [...state.products];
      updatedProducts[index] = action.payload.product;
      state.products = updatedProducts;
    },
    deleteProduct(state, action) {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.prodId
      );
    },
  },
});

export const productSliceActions = productSlice.actions;
export default productSlice.reducer;
