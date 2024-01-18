import React, { useState } from "react";

const SliderSwitch = ({ user, handleUpdate }) => {
  const [haveAccess, setHaveAccess] = useState(user);
  return (
    <div className="flex gap-2">
      <input
        type="checkbox"
        className={`w-6 cursor-pointer rounded-full p-2 ${haveAccess ? "accent-green-600" : "accent-red-700"}`}
        checked={haveAccess}
        onChange={() => {
          setHaveAccess((prevVal) => !prevVal);

          handleUpdate(!user);
        }}
      />
    </div>
  );
};

export default SliderSwitch;
