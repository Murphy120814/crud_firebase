import React from "react";
import DateView from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Field, ErrorMessage } from "formik";
import FormikError from "./FormikError";
function FormikDatePicker(props) {
  const { label, name, ...rest } = props;
  return (
    <>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <Field name={name}>
        {({ form, field }) => {
          const { setFieldValue } = form; //setField value allows you to programmatically set the field value

          const { value } = field;
          return (
            <DateView
              id={name}
              {...field}
              {...rest}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
              selected={value}
              onChange={(val) => setFieldValue(name, val)}
            />
          );
        }}
      </Field>
      <ErrorMessage name={name} component={FormikError} />
    </>
  );
}

export default FormikDatePicker;
