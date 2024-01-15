import React from "react";

function Image(props) {
  const { src, className, ...restProps } = props;
  return (
    <img
      src={src}
      alt={src}
      className={`h-[20px] w-[20px] cursor-pointer ${className}`}
      {...restProps}
    />
  );
}

export default Image;
