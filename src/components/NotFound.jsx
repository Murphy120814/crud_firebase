import React from "react";
import { errorHandlePng } from "../assets";

import { Button } from "../common";
import { Link } from "react-router-dom";
function NotFound() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-white dark:bg-black ">
      <Button className=" w-24 rounded-xl bg-primary-color p-2 transition-all ease-in-out hover:font-bold disabled:cursor-not-allowed disabled:opacity-50">
        <Link to="/">Back to Home</Link>
      </Button>
      <img
        src={errorHandlePng}
        alt="Error Handling"
        className="h-full w-6/12"
      />
    </div>
  );
}

export default NotFound;
