import {
  addProduct,
  deleteProduct,
  editProduct,
  getProducts,
} from "../firebase";
import { productSliceActions } from "./product-slice";

// The product actions where all async actions take place, but in a fire and forget manner i.e. the state update does not wait for the data to be updated in the database in most cases, it sends changes to the databse and changes the state directly in the product slice. This allows for instant updates.

export const getProductsAction = () => {
  return async (dispatch) => {
    const response = await getProducts();
    const products = Object.values(response);
    dispatch(productSliceActions.populateProducts({ products }));
  };
};

export const addProductAction = (name, price, imageUrl) => {
  return async (dispatch) => {
    const id = await addProduct(name, price, imageUrl);
    dispatch(
      productSliceActions.addProduct({ product: { id, name, price, imageUrl } })
    );
  };
};

export const editProductAction = (product) => {
  return async (dispatch) => {
    editProduct(product);
    dispatch(productSliceActions.editProduct({ product }));
  };
};

export const deleteProductAction = (prodId) => {
  return async (dispatch) => {
    deleteProduct(prodId);
    dispatch(productSliceActions.deleteProduct({ prodId }));
  };
};
