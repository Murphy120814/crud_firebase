import React, { useState } from "react";
import FormikControl from "../formik/FormikControl";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { viewPng, noViewPng } from "../../assets";
import { Button, Image } from "../../common";
import { options } from "../../../constants";
import { useNavigate } from "react-router-dom";
function UserFormikForm() {
  const navigate = useNavigate();
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
    onSubmitProps.resetForm();
    navigate("/home");
    console.log("hii");
  };
  return (
    <div className="flex  h-full min-h-[80vh] w-full items-start justify-center py-12">
      <Formik
        initialValues={initialValues}
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
              className="w-full rounded-lg bg-blue-700 px-5 py-2.5 mt-2 text-center text-sm font-medium text-white hover:bg-blue-800  disabled:bg-black disabled:opacity-20 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default UserFormikForm;
