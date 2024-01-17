import React, { useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectDarkMode } from "../../slices/themeSlice.js";

import { Button, Image } from "../../common";

import NavLinkContainer from "./NavLinkContainer";
import { logoPng } from "../../assets/index.js";
import ThemeToggle from "./ThemeToggle.jsx";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../../firebase.js";
import {
  updateAdminUID,
  getAdminUID,
  removeAdminUID,
} from "../../slices/adminSlice.js";
import {
  updateUserUID,
  getUserUID,
  removeUserUID,
  clearUserList,
} from "../../slices/userSlice.js";
function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const adminUID = useSelector(getAdminUID);
  const userUID = useSelector(getUserUID);
  const darkMode = useSelector(selectDarkMode);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.'
        console.log("user Have been signed out");
        dispatch(removeUserUID());
        dispatch(removeAdminUID());
        dispatch(clearUserList());
        window.localStorage.removeItem("adminUID");
        window.localStorage.removeItem("userUID");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        if (window.localStorage.getItem("adminUID")) {
          dispatch(updateAdminUID(window.localStorage.getItem("adminUID")));
        }
        if (window.localStorage.getItem("userUID")) {
          dispatch(updateUserUID(window.localStorage.getItem("userUID")));
        }
        navigate("/home");

        // ...
      } else {
        // User is signed out
        // ...
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [adminUID]);
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
      <NavLink to="/home">
        {" "}
        <Image src={logoPng} className="h-[50px] w-[50px]" />
      </NavLink>
      <div className="flex items-center gap-6 ">
        {adminUID || userUID ? <NavLinkContainer tabName="home" /> : null}
        {adminUID && <NavLinkContainer tabName="permission" />}
        {adminUID || userUID ? (
          <Button
            className="transition-all ease-in-out hover:font-bold hover:text-primary-color"
            onClick={handleSignOut}>
            SignOut
          </Button>
        ) : null}
        <ThemeToggle />
      </div>
    </div>
  );
}

export default Navbar;
