import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { formatTimestamp } from "../../constants";
export const addUsersFromFirebaseToStore = createAsyncThunk(
  "user/addUsersFromFirebaseToStore",
  async () => {
    let usersList = [];
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      usersList.push({
        id: doc.id,
        ...doc.data(),
        createdAt: formatTimestamp(doc.data().createdAt),
        dateOfBirth: formatTimestamp(doc.data().dateOfBirth),
      });
    });
    return usersList;
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: {
    userUID: null,
    userList: [],
    status: "idle", //idle, loading, succeeded, failed
    error: "",
  },
  reducers: {
    updateUserUID: (state, action) => {
      state.userUID = action.payload;
    },
    clearUserList: (state, action) => {
      state.userList.length = 0;
    },
    removeUserUID: (state) => {
      state.userUID = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUsersFromFirebaseToStore.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addUsersFromFirebaseToStore.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userList = action.payload;
      })
      .addCase(addUsersFromFirebaseToStore.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const getUserUID = (state) => state.user.userUID;
export const getStatus = (state) => state.user.status;
export const getUserList = (state) => state.user.userList;
export const getError = (state) => state.user.error;
export const { updateUserUID, removeUserUID , clearUserList } = userSlice.actions;
export default userSlice.reducer;
