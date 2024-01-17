import React, { useEffect } from "react";
import { Button } from "../../common";
import { useSelector, useDispatch } from "react-redux";
import { getAdminUID } from "../../slices/adminSlice";
import { Link } from "react-router-dom";
import { emptyPng } from "../../assets";
import Shimmer from "../Utils/Shimmer";
import {
  addUsersFromFirebaseToStore,
  getUserList,
  getStatus,
  getError,
} from "../../slices/userSlice";

import UserListTab from "./UserListTab";
import UserListTabActionButtons from "./UserListTabActionButtons";
function Home() {
  const dispatch = useDispatch();
  const adminUID = useSelector(getAdminUID);
  const status = useSelector(getStatus);
  const error = useSelector(getError);
  const userList = useSelector(getUserList);
  let renderedUserList;
  useEffect(() => {
    dispatch(addUsersFromFirebaseToStore());
  }, []);

  if (status === "loading") {
    return (
      <div className="flex flex-col gap-4 p-8">
        <Shimmer />
      </div>
    );
  }
  if (status === "failed") {
    return <div>{error}</div>;
  }
  if (status === "succeeded") {
    renderedUserList = userList.map((user) => {
      return (
        <div
          className="mb-2 flex w-full flex-col items-center justify-between rounded-xl p-3 shadow-xl dark:shadow-sm dark:shadow-slate-50 lg:flex-row"
          key={user.id}>
          <UserListTab user={user} />
          <UserListTabActionButtons user={user} />
        </div>
      );
    });
  }
  return (
    <div className="flex min-h-[80vh] flex-col items-center gap-4 p-4">
      {adminUID && (
        <Link to="/addUser" className="self-end ">
          <Button className="rounded-xl  bg-primary-color p-2 transition-all ease-in-out hover:font-bold">
            Add User
          </Button>
        </Link>
      )}

      {renderedUserList?.length == 0 ? (
        <div className="flex h-[30vh] w-2/12 flex-col gap-3">
          <img src={emptyPng} alt="emptyDog" className="h-full w-full" />
          <h1 className="text-center text-2xl font-bold">No one is here!!!</h1>
        </div>
      ) : (
        <div className="w-full">{renderedUserList}</div>
      )}
    </div>
  );
}

export default Home;
