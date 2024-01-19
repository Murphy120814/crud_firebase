export const navArray = ["home", "permission"];

export function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export const REACT_APP_ADMIN_UID = "iTDMzPmGKrXI8m83jPwUJJllchh2";
export const REACT_APP_FIREBASE_KEY = "AIzaSyB7yrAeCTdS5EzG8atxeRUQUbq9fA_EOw0";
export const options = [
  { key: "Select Option", value: "" },
  { key: "Male", value: "male" },
  { key: "Female", value: "female" },
  { key: "Other", value: "other" },
];

export const payLoadCreator = (
  name,
  email,
  dateOfBirth,
  contactNumber,
  workProfile,
  sex,
  canUpdate,
  canDelete,
  isAdmin,
  editedAt
) => ({
  name,
  email,
  dateOfBirth,
  contactNumber,
  workProfile,
  sex,
  canUpdate,
  canDelete,
  isAdmin,
  editedAt,
});

export function formatTimestamp(timestamp) {
  if (!timestamp) {
    return null;
  }
  // Convert to milliseconds
  const milliseconds =
    timestamp?.seconds * 1000 + timestamp?.nanoseconds / 1000000;

  // Create a Date object
  const date = new Date(milliseconds);

  // Format the date
  // Example: 'Monday, January 17, 2019, 8:08 PM'
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return date.toLocaleDateString("en-US", options);
}

export const USER_SUCCESS_LOGIN = "User has logged in Successfully!!";
export const USER_SUCCESS_DELETE = "User has been successfully deleted!!";
// export const USER_SUCCESS_UPDATE = "User has been successfully updated!!";
export const USER_SUCCESS_ADD = "User has been successfully added / updated!!";
export const USER_SUCCESS_LOGOUT = "User has been successfully logged out!!";
export const USER_PASSWORD_RESET_SUCCESSFULL =
  "Password reset email has been successfully sent";
