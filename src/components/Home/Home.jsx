import React, { useEffect } from "react";
import { Button } from "../../common";
import { useSelector } from "react-redux";
import { getAdminUID } from "../../slices/adminSlice";
import { Link } from "react-router-dom";
import { addUsersFromFirebaseToStore } from "../../slices/userSlice";
import { useDispatch } from "react-redux";
import { getUserList } from "../../slices/userSlice";
import { getStatus } from "../../slices/userSlice";
import { getError } from "../../slices/userSlice";
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
    return <div>Loading</div>;
  }
  if (status === "failed") {
    return <div>{error}</div>;
  }
  if (status === "succeeded") {
    renderedUserList = userList.map((user) => {
      return (
        <div
          className="w-full flex lg:flex-row flex-col justify-between shadow-xl p-3 rounded-xl items-center mb-2 dark:shadow-slate-50 dark:shadow-sm"
          key={user.id}>
          <UserListTab user={user} />
          <UserListTabActionButtons user={user} />
        </div>
      );
    });
  }
  return (
    <div className="min-h-[80vh] flex flex-col items-center gap-4 p-4">
      {adminUID && (
        <Link to="/addUser" className="self-end ">
          <Button className="p-2  bg-primary-color hover:font-bold transition-all ease-in-out rounded-xl">
            Add User
          </Button>
        </Link>
      )}

      <div className="w-full">{renderedUserList}</div>
    </div>
  );
}

export default Home;
