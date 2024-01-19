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
    successMessage: "",
    errorMessage: "",
    modalIsActive: false,
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

    updateErrorAndSuccessMessage: (state, action) => {
      if (action.payload.tag == "error") {
        state.errorMessage = action.payload.message;
      } else if (action.payload.tag == "success") {
        state.successMessage = action.payload.message;
      }
    },

    toggleModal: (state, action) => {
      state.modalIsActive = action.payload;
    },
  },
});

export const getUserUID = (state) => state.user.userUID;
export const getErrorMessage = (state) => state.user.errorMessage;
export const getSuccessMessage = (state) => state.user.successMessage;
export const getUserList = (state) => state.user.userList;
export const getModalIsActive = (state) => state.user.modalIsActive;

export const {
  updateUserUID,
  removeUserUID,
  clearUserList,
  addUserAuthInfo,
  updateErrorAndSuccessMessage,
  toggleModal,
  addUserList,
} = userSlice.actions;
export default userSlice.reducer;
