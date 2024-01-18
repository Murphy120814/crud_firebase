import React, { useState, useEffect } from "react";

const SliderSwitch = ({ hasAccess, handleUpdate }) => {
  const [accessState, setAccessState] = useState(hasAccess);

  // Synchronize internal state with the prop
  useEffect(() => {
    setAccessState(hasAccess);
  }, [hasAccess]);

  return (
    <div className="flex cursor-pointer items-center gap-2">
      <input
        type="checkbox"
        id="toggleButton"
        checked={accessState}
        // className="  hidden"
        onChange={() => {
          const newAccessState = !accessState;
          setAccessState(newAccessState);
          handleUpdate(newAccessState);
        }}
      />
      <label
        htmlFor="toggleButton"
        className={`h-6 w-6 cursor-pointer rounded-full ${accessState ? "bg-green-600" : "bg-red-700"}`}
      />
    </div>
  );
};

export default SliderSwitch;
