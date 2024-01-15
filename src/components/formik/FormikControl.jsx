import React from "react";
import FormikInput from "./FormikInput";

function FormikControl(props) {
  const { control, ...restProps } = props;

  switch (control) {
    case "input":
      return <FormikInput {...restProps} />;
    default:
      return null;
  }
}

export default FormikControl;
