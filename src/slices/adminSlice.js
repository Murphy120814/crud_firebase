import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    adminUID: null,
  },
  reducers: {
    updateAdminUID: (state, action) => {
      state.adminUID = action.payload;
    },
    removeAdminUID: (state) => {
      state.adminUID = null;
    },
  },
});

export const getAdminUID = (state) => state.admin.adminUID;
export const { updateAdminUID, removeAdminUID } = adminSlice.actions;
export default adminSlice.reducer;
