import React from "react";
import { Button } from "../../common";
import { Link } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useSelector } from "react-redux";
import { getUserList } from "../../slices/userSlice";
function UserListTabActionButtons({ user }) {
  const userList = useSelector(getUserList);
  const currentUser = userList.find(
    (individualUser) =>
      window.localStorage.getItem("userUID") == individualUser.id
  );
  const handleDeleteUser = async function (uid) {
    try {
      await deleteDoc(doc(db, "users", uid));
      console.log("Document successfully deleted!");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" flex w-full items-center gap-2 lg:w-3/12 lg:gap-4">
      <Button
        className="w-16 rounded-xl bg-primary-color p-2 transition-all ease-in-out hover:font-bold disabled:cursor-not-allowed disabled:opacity-50"
        disabled={
          !(
            user.id == window.localStorage.getItem("userUID") ||
            window.localStorage.getItem("adminUID") ||
            currentUser.canUpdate
          )
        }>
        <Link to={`/editUser/${user.id}`}>Edit</Link>
      </Button>
      <Button
        className="w-16 rounded-xl bg-primary-color p-2 transition-all ease-in-out hover:font-bold disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => handleDeleteUser(user.id)}
        disabled={!window.localStorage.getItem("adminUID")}>
        Delete
      </Button>
      <Button
        className="w-16 rounded-xl bg-primary-color p-2 transition-all ease-in-out hover:font-bold disabled:cursor-not-allowed disabled:opacity-50"
        disabled={
          !(
            user.id == window.localStorage.getItem("userUID") ||
            window.localStorage.getItem("adminUID") ||
            currentUser.canView
          )
        }>
        <Link to={`/viewUser/${user.id}`}> View</Link>
      </Button>
    </div>
  );
}

export default UserListTabActionButtons;
