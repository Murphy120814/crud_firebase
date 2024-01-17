import React from "react";

function ShimmerUi() {
  const divArray = new Array(10).fill("").map((_, index) => {
    return (
      <div
        key={index}
        className="mb-2 flex w-full flex-col items-center justify-between rounded-xl p-6 shadow-xl dark:shadow-sm dark:shadow-slate-50 lg:flex-row"
      />
    );
  });
  return divArray;
}

export default ShimmerUi;
