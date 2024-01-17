import React from "react";
import { Button } from "../../common";
import { Link } from "react-router-dom";
function UserListTabActionButtons({ user }) {
  console.log(user);
  return (
    <div className=" flex w-full items-center gap-2 lg:w-3/12 lg:gap-4">
      <Button className="w-16 rounded-xl bg-primary-color p-2 transition-all ease-in-out hover:font-bold">
        <Link to={`/editUser/${user.id}`}>Edit</Link>
      </Button>
      <Button className="w-16 rounded-xl bg-primary-color p-2 transition-all ease-in-out hover:font-bold">
        Delete
      </Button>
      <Button className="w-16 rounded-xl bg-primary-color p-2 transition-all ease-in-out hover:font-bold">
        <Link to={`/viewUser/${user.id}`}> View</Link>
      </Button>
    </div>
  );
}

export default UserListTabActionButtons;
