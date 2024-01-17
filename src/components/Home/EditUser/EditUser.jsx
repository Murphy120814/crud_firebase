import React from "react";
import UserFormikForm from "../UserFormikForm";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserList } from "../../../slices/userSlice";
import { parse } from "date-fns";
function EditUser() {
  const formatDateIntoFNSFormat = (dateString) => {
    const datePart = dateString.match(/\b(\w+ \d{1,2}, \d{4})\b/)[0];
    // Parse the extracted date string into a Date object
    const date = parse(datePart, "MMMM d, yyyy", new Date());
    return date;
  };
  const { uid } = useParams();
  const userList = useSelector(getUserList);
  let savedValues = userList.find((user) => user.id === uid);
  savedValues = {
    ...savedValues,
    password: "User@12",
    dateOfBirth: formatDateIntoFNSFormat(savedValues?.dateOfBirth),
  };
  return <UserFormikForm savedValues={savedValues} uid={uid} />;
}

export default EditUser;
