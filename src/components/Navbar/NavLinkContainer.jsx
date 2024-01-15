import React from "react";
import { NavLink } from "react-router-dom";
import { capitalize } from "../../../constants";
function NavLinkContainer({ tabName }) {
  return (
    <NavLink to={`/${tabName}`}>
      {({ isActive }) => (
        <span className={isActive ? "font-bold text-primary-color" : ""}>
          {" "}
          {capitalize(tabName)}{" "}
        </span>
      )}
    </NavLink>
  );
}

export default NavLinkContainer;
