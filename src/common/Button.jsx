import React from "react";

function Button(props) {
  const { children, className, ...restProps } = props;
  return (
    <button className={className} {...restProps}>
      {children}
    </button>
  );
}

export default Button;
