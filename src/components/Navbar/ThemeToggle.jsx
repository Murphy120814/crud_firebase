import React from "react";
import { Button, Image } from "../../common";
import { useDispatch, useSelector } from "react-redux";
import { selectDarkMode, toggleDarkMode } from "../../slices/themeSlice";
import { sunPng, moonPng } from "../../assets";
function ThemeToggle() {
  const darkMode = useSelector(selectDarkMode);

  const dispatch = useDispatch();
  const handleToggleDarkMode = () => {
    if (darkMode) {
      window.localStorage.removeItem("darkMode");
    } else {
      window.localStorage.setItem("darkMode", true);
    }
    dispatch(toggleDarkMode());
  };
  return (
    <Button className="" onClick={handleToggleDarkMode}>
      <div className="flex gap-2 rounded-xl border p-2">
        <Image src={darkMode ? sunPng : moonPng} />
        <span>{darkMode ? "Light" : "Dark"}</span>
      </div>
    </Button>
  );
}

export default ThemeToggle;
