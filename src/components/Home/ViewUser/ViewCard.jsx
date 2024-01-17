import React from "react";
import { capitalize } from "../../../../constants";
function ViewCard(props) {
  let { field, value } = props;
  if (value === null) {
    value = "Not Yet Updated";
  }
  if (typeof value === "boolean") {
    value = value.toString();
  }
  if (typeof value === "object") {
    value = "-";
  }
  return (
    <div className="mb-2  mt-8 flex items-center justify-start gap-4 ">
      <label className="flex w-4/12 font-bold text-black" htmlFor={field}>
        {capitalize(field)}:
      </label>
      <div id={field} className="flex w-8/12  text-black">
        {value}
      </div>
    </div>
  );
}

export default ViewCard;
