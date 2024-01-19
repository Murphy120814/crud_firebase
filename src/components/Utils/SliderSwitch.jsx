import React, { useState } from "react";

const SliderSwitch = ({ id, hasAccess, handleUpdate }) => {
  const [accessState, setAccessState] = useState(hasAccess);

  return (
    <div className="flex cursor-pointer items-center gap-2">
      <input
        type="checkbox"
        id={"toggleButton" + id}
        checked={accessState}
        className="hidden"
        onChange={() => {
          const newAccessState = !accessState;
          setAccessState(newAccessState);
          handleUpdate(newAccessState);
        }}
      />
      <label
        htmlFor={"toggleButton" + id}
        className={`h-6 w-6 cursor-pointer rounded-full ${accessState ? "bg-green-600" : "bg-red-700"}`}
      />
    </div>
  );
};

export default SliderSwitch;
