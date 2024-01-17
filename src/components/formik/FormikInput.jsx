import React from "react";
import { Field, ErrorMessage } from "formik";
import FormikError from "./FormikError";

function FormikInput(props) {
  const { label, name, ...rest } = props;
  return (
    <>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <Field
        id={name}
        name={name}
        {...rest}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 disabled:cursor-not-allowed dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
      />
      <ErrorMessage name={name} component={FormikError} />
    </>
  );
}

export default FormikInput;
