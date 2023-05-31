import {
  getUserDetails,
  logoutUser,
  setUserDetails,
  signInUser,
  signUpUser,
} from "../firebase";
import { authSliceActions } from "./auth-slice";

// All actions that include asyncronous processes and then updates the state.

export const signUpUserAction = (email, password, role) => {
  return async (dispatch) => {
    const response = await signUpUser(email, password);
    await setUserDetails(response?.user?.uid, email, role);
    dispatch(authSliceActions.logUserIn({ email, role }));
  };
};

export const signInUserAction = (email, password) => {
  return async (dispatch) => {
    const response = await signInUser(email, password);
    const { role } = await getUserDetails(response?.user?.uid);
    dispatch(authSliceActions.logUserIn({ email, role }));
  };
};

export const logOutUserAction = () => {
  return async (dispatch) => {
    await logoutUser();
    dispatch(authSliceActions.logUserOut());
  };
};
