import React, { useEffect } from "react";
import { Button } from "../../common";
import { useSelector, useDispatch } from "react-redux";
import { getAdminUID } from "../../slices/adminSlice";
import { Link } from "react-router-dom";
import { emptyPng } from "../../assets";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import Shimmer from "../Utils/Shimmer";
import { getUserList, addUserList } from "../../slices/userSlice";
import { formatTimestamp } from "../../../constants";

import UserListTab from "./UserListTab";
import UserListTabActionButtons from "./UserListTabActionButtons";
function Home() {
  const dispatch = useDispatch();
  const adminUID = useSelector(getAdminUID);
  const userList = useSelector(getUserList);
  let renderedUserList;
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        const list = [];
        snapshot.docs.forEach((doc) => {
          list.push({
            id: doc.id,
            ...doc.data(),
            rawCreationAt: doc.data().createdAt,
            createdAt: formatTimestamp(doc.data().createdAt),
            dateOfBirth: formatTimestamp(doc.data().dateOfBirth),
            editedAt:
              doc.data().editedAt && formatTimestamp(doc.data().editedAt),
          });
        });

        dispatch(addUserList(list));
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  if (userList.length == 0) {
    return <Shimmer />;
  } else {
    renderedUserList = userList.map((user) => {
      return (
        <div
          className="mb-2 flex w-full flex-col items-center justify-between rounded-xl p-3 shadow-xl dark:shadow-sm dark:shadow-slate-50 lg:flex-row"
          key={user.id}>
          <UserListTab user={user} />
          <UserListTabActionButtons user={user} />
        </div>
      );
    });
  }

  return (
    <div className="flex min-h-[80vh] flex-col items-center gap-4 p-4">
      {adminUID && (
        <Link to="/addUser" className="self-end ">
          <Button className="rounded-xl  bg-primary-color p-2 transition-all ease-in-out hover:font-bold">
            Add User
          </Button>
        </Link>
      )}

      {renderedUserList?.length == 0 ? (
        <div className="flex h-[30vh] w-2/12 flex-col gap-3">
          <img src={emptyPng} alt="emptyDog" className="h-full w-full" />
          <h1 className="text-center text-2xl font-bold">No one is here!!!</h1>
        </div>
      ) : (
        <div className="w-full">{renderedUserList}</div>
      )}
    </div>
  );
}

export default Home;
