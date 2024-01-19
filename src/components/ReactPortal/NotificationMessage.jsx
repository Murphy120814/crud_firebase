import React from "react";
import { getErrorMessage, getSuccessMessage } from "../../slices/userSlice";
import { useSelector } from "react-redux";
function NotificationMessage() {
  const errorMessage = useSelector(getErrorMessage);
  const successMessage = useSelector(getSuccessMessage);

  return (
    <div
      className={`absolute left-1/2 top-0 mt-8 w-4/12 -translate-x-1/2 rounded-xl border-2 ${errorMessage ? "border-red-600 bg-red-200 text-red-700" : "border-green-600 bg-lime-200 text-green-700"}  p-2 text-center `}>
      {typeof errorMessage === "object" || typeof successMessage === "object"
        ? "Something went wrong"
        : errorMessage || successMessage}
    </div>
  );
}

export default NotificationMessage;
