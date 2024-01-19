import React, { useEffect } from "react";
import ReactPortalContainer from "./ReactPortalContainer";
import {
  getModalIsActive,
  toggleModal,
  updateErrorAndSuccessMessage,
} from "../../slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import NotificationMessage from "./NotificationMessage";

function Notification() {
  const dispatch = useDispatch();
  const modalStatus = useSelector(getModalIsActive);
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(toggleModal(false));
      dispatch(
        updateErrorAndSuccessMessage({
          tag: "error",
          message: "",
        })
      );
      dispatch(
        updateErrorAndSuccessMessage({
          tag: "success",
          message: "",
        })
      );
    }, 2000);

    return () => clearTimeout(timer);
  }, [modalStatus]);

  return (
    modalStatus && (
      <ReactPortalContainer>
        {" "}
        <NotificationMessage />{" "}
      </ReactPortalContainer>
    )
  );
}

export default Notification;
