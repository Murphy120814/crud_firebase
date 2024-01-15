import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../../slices/themeSlice.js";
import { navArray } from "../../../constants.js";
import { NavLink } from "react-router-dom";
import { Image } from "../../common";
import NavLinkContainer from "./NavLinkContainer";
import { logoPng } from "../../assets/index.js";
import ThemeToggle from "./ThemeToggle.jsx";
function Navbar() {
  const darkMode = useSelector(selectDarkMode);

  useEffect(() => {
    // window.localStorage.setItem("darkMode", darkMode);
    if (window.localStorage.getItem("darkMode") === "true") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);
  return (
    <div className="flex w-full items-center  justify-between px-4 py-2">
      <NavLink to="/">
        {" "}
        <Image src={logoPng} className="h-[50px] w-[50px]" />
      </NavLink>
      <div className="flex items-center gap-6 ">
        {" "}
        {navArray.map((tabName, index) => (
          <NavLinkContainer key={index} tabName={tabName} />
        ))}
        <ThemeToggle />
      </div>
    </div>
  );
}

export default Navbar;
