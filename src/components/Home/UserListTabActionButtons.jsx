import React from "react";
import { Button } from "../../common";
function UserListTabActionButtons({ user }) {
  return (
    <div className=" w-full lg:w-3/12 flex items-center gap-2 lg:gap-4">
      <Button className="p-2 bg-primary-color w-16 hover:font-bold transition-all ease-in-out rounded-xl">
        Edit
      </Button>
      <Button className="p-2 bg-primary-color w-16 hover:font-bold transition-all ease-in-out rounded-xl">
        Delete
      </Button>
      <Button className="p-2 bg-primary-color w-16 hover:font-bold transition-all ease-in-out rounded-xl">
        View
      </Button>
    </div>
  );
}

export default UserListTabActionButtons;
