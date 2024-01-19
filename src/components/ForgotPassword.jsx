import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import { USER_PASSWORD_RESET_SUCCESSFULL } from "../../constants";
import { useDispatch } from "react-redux";
import { toggleModal, updateErrorAndSuccessMessage } from "../slices/userSlice";
function ForgotPassword() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(false);
  const handlePasswordReset = (email) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
        dispatch(toggleModal(true));
        dispatch(
          updateErrorAndSuccessMessage({
            tag: "success",
            message: USER_PASSWORD_RESET_SUCCESSFULL,
          })
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        dispatch(toggleModal(true));
        dispatch(
          updateErrorAndSuccessMessage({
            tag: "error",
            message: errorCode,
          })
        );
        // ..
      });
  };
  return (
    <div className="flex h-full min-h-[80vh] w-full flex-col items-center justify-center py-12">
      <div>
        {" "}
        <h1>Enter Registered Email Address</h1>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="mt-4 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 disabled:cursor-not-allowed dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
        />
        <button
          type="button"
          disabled={disabled}
          onClick={() => {
            handlePasswordReset(email);
            setDisabled(true);
            setTimeout(() => {
              setDisabled(false);
            }, 4000);
          }}
          className="mt-4 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800  disabled:bg-black disabled:opacity-20 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto">
          Reset Password
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;
