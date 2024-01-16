import React from "react";
import FormikInput from "./FormikInput";
import FormikSelectInput from "./FormikSelectInput";
import FormikDatePicker from "./FormikDatePicker";
function FormikControl(props) {
  const { control, ...restProps } = props;

  switch (control) {
    case "input":
      return <FormikInput {...restProps} />;
    case "select":
      return <FormikSelectInput {...restProps} />;
    case "date":
      return <FormikDatePicker {...restProps} />;
    default:
      return null;
  }
}

export default FormikControl;
