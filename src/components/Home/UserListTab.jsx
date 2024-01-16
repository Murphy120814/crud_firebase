import React from "react";

function UserListTab({ user }) {
  return (
    <div className=" w-full lg:w-8/12  px-2 flex justify-between items-center">
      <span className="font-bold">{user.name}</span>
    </div>
  );
}

export default UserListTab;
