import { createSlice } from "@reduxjs/toolkit";

// The auth slice, that maintains the data of the user that is logged in.

const initialState = {
  isLoggedIn: false,
  email: "",
  role: "",
  canEditOrCreate: false, // checks if editor/admin
  canDelete: false, // checks if admin
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logUserIn(state, action) {
      state.isLoggedIn = true;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.canEditOrCreate =
        action.payload.role === "admin" || action.payload.role === "editor";
      state.canDelete = action.payload.role === "admin";
    },
    logUserOut() {
      return initialState;
    },
  },
});

export const authSliceActions = authSlice.actions;
export default authSlice.reducer;
