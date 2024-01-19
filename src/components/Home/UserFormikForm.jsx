import React, { useState } from "react";
import FormikControl from "../formik/FormikControl";
import { Formik, Form } from "formik";
import { auth, db } from "../../../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { USER_SUCCESS_ADD, options } from "../../../constants";
import * as Yup from "yup";
import { viewPng, noViewPng } from "../../assets";
import { Button, Image } from "../../common";
import { getAdminUID } from "../../slices/adminSlice";
import {
  getUserUID,
  toggleModal,
  updateErrorAndSuccessMessage,
} from "../../slices/userSlice";
import { useSelector, useDispatch } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";

function UserFormikForm({ savedValues, uid }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uid: userId } = useParams();
  const adminUID = useSelector(getAdminUID);
  const userUID = useSelector(getUserUID);
  const [showPassword, setShowPassword] = useState(false);
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    dateOfBirth: Yup.date().required("Date of Birth is required"),
    contactNumber: Yup.string()
      .required("Contact Number is required")
      .min(10, "Must have 10 digits")
      .max(10, "Must have 10 digits"),
    workProfile: Yup.string().required("Work Profile is required"),
    sex: Yup.string().required("Gender is required"),
  });

  const handleAddUsersData = async function (
    name,
    email,
    password,
    dateOfBirth,
    contactNumber,
    workProfile,
    sex,
    canUpdate,
    canDelete,
    canView,
    isAdmin,
    editedAt
  ) {
    try {
      let userRes;
      if (!savedValues) {
        userRes = await createUserWithEmailAndPassword(auth, email, password);
        console.log(userRes);
      }
      const currentUserId = savedValues ? uid : userRes.user.uid;
      console.log(currentUserId);
      await setDoc(doc(db, "users", currentUserId), {
        name,
        email,
        dateOfBirth,
        contactNumber,
        workProfile,
        sex,
        canUpdate,
        canDelete,
        canView,
        isAdmin,
        editedAt: savedValues ? serverTimestamp() : editedAt,
        createdAt: savedValues ? savedValues.rawCreationAt : serverTimestamp(),
      });
      dispatch(toggleModal(true));
      dispatch(
        updateErrorAndSuccessMessage({
          tag: "success",
          message: USER_SUCCESS_ADD,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(toggleModal(true));
      dispatch(
        updateErrorAndSuccessMessage({
          tag: "error",
          message: error,
        })
      );
    }
  };

  let disabledStatus = true;

  if (adminUID && savedValues) {
    disabledStatus = true;
  }
  if ((userUID == userId && savedValues) || adminUID) {
    disabledStatus = false;
  }

  const handleNumericChange = (e, formikChange) => {
    const { value } = e.target;
    if (value === "" || /^[0-9\b]+$/.test(value)) {
      formikChange(e);
    }
  };
  const initialValues = {
    name: "",
    email: "",
    password: "",
    dateOfBirth: "",
    contactNumber: "",
    workProfile: "",
    sex: "",
  };
  const onSubmit = (values, onSubmitProps) => {
    console.log("Form data", values);
    if (savedValues?.email != values.email) {
      updateEmail(auth.currentUser, values.email)
        .then(() => {
          // Email updated!
          // ...
          console.log("email Updated");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (values.password != "User@12") {
      updatePassword(auth.currentUser, values.password)
        .then(() => {
          // Update successful.
          console.log("password Updated");
        })
        .catch((error) => {
          // An error ocurred
          // ...
          console.log(error);
        });
    }
    const {
      name,
      email,
      password,
      dateOfBirth,
      contactNumber,
      workProfile,
      sex,
    } = values;
    onSubmitProps.resetForm();
    handleAddUsersData(
      name,
      email,
      password,
      dateOfBirth,
      contactNumber,
      workProfile,
      sex,
      false,
      false,
      false,
      false,
      null
    );
    navigate("/home");
  };
  return (
    <div className="flex  min-h-[80vh] w-full items-start justify-center py-12">
      <Formik
        initialValues={savedValues || initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}>
        {(formik) => (
          <Form className="grid w-3/4  p-4 sm:grid-cols-2 sm:gap-2 md:w-5/12">
            <div className="sm:col-span-2 ">
              <FormikControl
                control="input"
                label="Name"
                type="text"
                name="name"
                placeholder="Prathmesh"
              />
            </div>
            <div className="sm:col-span-2 ">
              <FormikControl
                control="input"
                label="Email"
                type="text"
                disabled={disabledStatus}
                name="email"
                placeholder="prathm@frontendmeta.dev"
              />
            </div>
            <div className="relative sm:col-span-2 ">
              <div className="absolute right-0 top-[39px] flex cursor-pointer items-center pr-4">
                <Image
                  src={!showPassword ? viewPng : noViewPng}
                  className="h-5 w-5"
                  onClick={() => setShowPassword((preVal) => !preVal)}
                />
              </div>

              <FormikControl
                control="input"
                label={savedValues ? "Update Password" : "New Password"}
                type={showPassword ? "text" : "password"}
                name="password"
                disabled={disabledStatus}
                placeholder="********"
              />
            </div>
            <div className="w-full">
              <FormikControl
                control="select"
                label="Gender"
                name="sex"
                options={options}
              />
            </div>
            <div className="w-full">
              <FormikControl
                control="date"
                label="Date Of Birth"
                name="dateOfBirth"
              />
            </div>
            <div className="sm:col-span-2 ">
              <FormikControl
                control="input"
                label="Work Profile"
                type="text"
                name="workProfile"
                placeholder="React Developer"
              />
            </div>
            <div className="sm:col-span-2 ">
              <FormikControl
                control="input"
                label="Contact Number"
                type="text"
                name="contactNumber"
                onChange={(e) => {
                  handleNumericChange(e, formik.handleChange);
                }}
                placeholder="9082027703"
              />
            </div>
            <Button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="mt-2 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800  disabled:bg-black disabled:opacity-20 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto">
              {savedValues ? "Update User" : "Submit"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default UserFormikForm;
