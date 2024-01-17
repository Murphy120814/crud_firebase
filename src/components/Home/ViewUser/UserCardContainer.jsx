import React from "react";
import { Link } from "react-router-dom";
import ViewCard from "./ViewCard";
import { useSelector } from "react-redux";
import { getUserList } from "../../../slices/userSlice";
function UserCardContainer({ user }) {
  if (!user) {
    return null;
  }
  const userList = useSelector(getUserList);
  const currentUser = userList.find(
    (individualUser) =>
      window.localStorage.getItem("userUID") == individualUser.id
  );
  return (
    <div className="w-6/12 rounded-xl bg-blue-300 p-8 text-center  shadow-xl dark:shadow-md dark:shadow-slate-600">
      <span className=" text-2xl font-extrabold text-black">
        User&apos;s Info
      </span>
      {Object.entries(user).map(([field, value], index) => (
        <ViewCard field={field} value={value} key={index} />
      ))}
      <Link to={`/editUser/${user.id}`}>
        <button
          className="mt-4 rounded-2xl bg-blue-700 px-4 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          disabled={
            !(
              user.id == window.localStorage.getItem("userUID") ||
              window.localStorage.getItem("adminUID") ||
              currentUser.canUpdate
            )
          }>
          Update
        </button>
      </Link>
    </div>
  );
}

export default UserCardContainer;
