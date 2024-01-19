import React from "react";
import { Button } from "../../common";
import { Link } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserList,
  toggleModal,
  updateErrorAndSuccessMessage,
} from "../../slices/userSlice";
import { USER_SUCCESS_DELETE } from "../../../constants";

function UserListTabActionButtons({ user }) {
  const dispatch = useDispatch();
  const userList = useSelector(getUserList);
  const currentUser = userList.find(
    (individualUser) =>
      window.localStorage.getItem("userUID") == individualUser.id
  );
  const handleDeleteUser = async function (uid) {
    try {
      await deleteDoc(doc(db, "users", uid));
      dispatch(toggleModal(true));
      dispatch(
        updateErrorAndSuccessMessage({
          tag: "success",
          message: USER_SUCCESS_DELETE,
        })
      );
      console.log("Document successfully deleted!");
    } catch (error) {
      console.log(error);
      dispatch(toggleModal(true));
      dispatch(
        updateErrorAndSuccessMessage({
          tag: "error",
          message: error,
        })
      );
    }
  };
  return (
    <div className=" flex w-full items-center gap-2 lg:w-3/12 lg:gap-4">
      <Link to={`/editUser/${user.id}`}>
        {" "}
        <Button
          className="w-16 rounded-xl bg-primary-color p-2 transition-all ease-in-out hover:font-bold disabled:cursor-not-allowed disabled:opacity-50"
          disabled={
            !(
              user.id == window.localStorage.getItem("userUID") ||
              window.localStorage.getItem("adminUID") ||
              currentUser?.canUpdate
            )
          }>
          Edit
        </Button>
      </Link>
      {window.localStorage.getItem("adminUID") && (
        <Button
          className="w-16 rounded-xl bg-primary-color p-2 transition-all ease-in-out hover:font-bold disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => handleDeleteUser(user.id)}
          disabled={!window.localStorage.getItem("adminUID")}>
          Delete
        </Button>
      )}
      <Link to={`/viewUser/${user.id}`}>
        {" "}
        <Button
          className="w-16 rounded-xl bg-primary-color p-2 transition-all ease-in-out hover:font-bold disabled:cursor-not-allowed disabled:opacity-50"
          disabled={
            !(
              user.id == window.localStorage.getItem("userUID") ||
              window.localStorage.getItem("adminUID") ||
              currentUser?.canView
            )
          }>
          View
        </Button>{" "}
      </Link>
    </div>
  );
}

export default UserListTabActionButtons;
