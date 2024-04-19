import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./formik/FormikControl";
import { viewPng, noViewPng } from "../assets";
import { USER_SUCCESS_LOGIN, REACT_APP_ADMIN_UID } from "../../constants";
import { Image } from "../common";
import { auth } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { updateAdminUID } from "../slices/adminSlice";
import {
  updateUserUID,
  toggleModal,
  updateErrorAndSuccessMessage,
} from "../slices/userSlice";

function AuthenticationForm() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const initialValues = {
    email: "",
    password: "",
  };
  // useEffect(() => {
  //   setTimeout(() => {
  //     setShowErrorMessage("");
  //   }, [3000]);
  // }, [showErrorMessage]);
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const onSubmit = (values, onSubmitProps) => {
    console.log("Form data", values);
    onSubmitProps.resetForm();
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in
        const { uid } = userCredential.user;

        if (uid == REACT_APP_ADMIN_UID) {
          console.log("in Admin");
          dispatch(updateAdminUID(uid));
          window.localStorage.setItem("adminUID", uid);
        } else {
          console.log("in User");
          dispatch(updateUserUID(uid));
          window.localStorage.setItem("userUID", uid);
        }

        navigate("/home");
        dispatch(toggleModal(true));
        dispatch(
          updateErrorAndSuccessMessage({
            tag: "success",
            message: USER_SUCCESS_LOGIN,
          })
        );
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        dispatch(toggleModal(true));
        dispatch(
          updateErrorAndSuccessMessage({
            tag: "error",
            message: errorMessage,
          })
        );
        // setShowErrorMessage(errorCode);
        // console.log({ errorCode, errorMessage });
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {(formik) => (
        <Form className="grid w-3/4 gap-4  p-4 sm:grid-cols-2 sm:gap-6 md:w-4/12">
          <div className="sm:col-span-2 ">
            <FormikControl
              control="input"
              label="Email"
              type="text"
              name="email"
              placeholder="prathm@frontendmeta.dev"
            />
          </div>
          <div className="relative sm:col-span-2 ">
            <div className="absolute  right-0 top-[39px] flex cursor-pointer items-center pr-4">
              <Image
                src={!showPassword ? viewPng : noViewPng}
                className="h-5 w-5"
                onClick={() => setShowPassword((preVal) => !preVal)}
              />
            </div>

            <FormikControl
              control="input"
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="********"
            />
          </div>

          <span className="font-semibold text-blue-900">
            {" "}
            <Link to="/resetPassword">Forgot Password?</Link>
          </span>

          <button
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800  disabled:bg-black disabled:opacity-20 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto">
            Log In
          </button>
          <p className="font-semibold text-black dark:text-white">
           For admin usage use Email: <span className="text-red-500">prathm@frontendmeta.dev</span> and password as <span className="text-red-500">Admin@12</span> 
          </p>
        </Form>
      )}
    </Formik>
  );
}

export default AuthenticationForm;
