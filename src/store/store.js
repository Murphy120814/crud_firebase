import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../slices/themeSlice";
import adminReducer from "../slices/adminSlice";
import userReducer from "../slices/userSlice";
const store = configureStore({
  reducer: {
    theme: themeReducer,
    admin: adminReducer,
    user: userReducer,
  },
});

export default store;
