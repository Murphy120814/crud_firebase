import React, { useState } from "react";

const SliderSwitch = ({ user, handleUpdate }) => {
  const [checked, setChecked] = useState(false);
  return (
    <div className="flex gap-2">
      <span className="font-extralight text-black dark:text-white">
        {user ? "Access" : "Denied"}
      </span>
      <input
        type="checkbox"
        className={`w-6 cursor-pointer rounded-full p-2 ${checked ? "bg-green-600" : "accent-red-700"}`}
        checked={user}
        onChange={() => {
          setChecked((prevVal) => !prevVal);
          handleUpdate(checked);
        }}
      />
    </div>
  );
};

export default SliderSwitch;
