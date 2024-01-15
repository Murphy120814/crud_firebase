import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userUID: null,
  },
  reducers: {
    updateUserUID: (state, action) => {
      state.userUID = action.payload;
    },
    removeUserUID: (state) => {
      state.userUID = null;
    },
  },
});

export const getUserUID = (state) => state.user.userUID;
export const { updateUserUID, removeUserUID } = userSlice.actions;
export default userSlice.reducer;
