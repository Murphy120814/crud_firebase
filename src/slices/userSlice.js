import { createSlice } from "@reduxjs/toolkit";

// export const addUsersFromFirebaseToStore = createAsyncThunk(
//   "user/addUsersFromFirebaseToStore",
//   async () => {
//     const usersList = [];

//     const querySnapshot = await getDocs(collection(db, "users"));
//     querySnapshot.forEach((doc) => {
//       usersList.push({
//         id: doc.id,
//         ...doc.data(),
//         rawCreationAt: doc.data().createdAt,
//         createdAt: formatTimestamp(doc.data().createdAt),
//         dateOfBirth: formatTimestamp(doc.data().dateOfBirth),
//         editedAt: doc.data().editedAt && formatTimestamp(doc.data().editedAt),
//       });
//     });
//     return usersList;
//   }
// );
const userSlice = createSlice({
  name: "user",
  initialState: {
    userUID: null,
    userList: [],
  },
  reducers: {
    updateUserUID: (state, action) => {
      state.userUID = action.payload;
    },

    addUserAuthInfo: (state, action) => {
      state.userAuthInfo.push(action.payload);
    },

    addUserList: (state, action) => {
      state.userList = action.payload;
    },
    clearUserList: (state, action) => {
      state.userList.length = 0;
    },
    removeUserUID: (state) => {
      state.userUID = null;
    },
  },
});

export const getUserUID = (state) => state.user.userUID;

export const getUserList = (state) => state.user.userList;

export const {
  updateUserUID,
  removeUserUID,
  clearUserList,
  addUserAuthInfo,
  addUserList,
} = userSlice.actions;
export default userSlice.reducer;
