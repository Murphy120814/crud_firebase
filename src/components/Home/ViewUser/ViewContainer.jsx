import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserList } from "../../../slices/userSlice";
import UserCardContainer from "./UserCardContainer";

function ViewContainer() {
  const { uid } = useParams();
  const userList = useSelector(getUserList);
    const user = userList.find((user) => user.id === uid);
  return (
    <div className="flex  min-h-[80vh] w-full items-start justify-center py-12">
      <UserCardContainer user={user} />
    </div>
  );
}

export default ViewContainer;
