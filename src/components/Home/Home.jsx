import React from "react";
import { Button } from "../../common";
import { useSelector } from "react-redux";
import { getAdminUID } from "../../slices/adminSlice";
import { Link } from "react-router-dom";
function Home() {
  const adminUID = useSelector(getAdminUID);
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-between p-4">
      {adminUID && (
        <Link to="/addUser" className="self-end ">
          <Button className="p-2  bg-primary-color hover:font-bold transition-all ease-in-out rounded-xl">
            Add User
          </Button>
        </Link>
      )}
      <></>
    </div>
  );
}

export default Home;
