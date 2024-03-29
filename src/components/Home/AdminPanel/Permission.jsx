import React from "react";
import { useSelector } from "react-redux";
import { getUserList } from "../../../slices/userSlice";
import SliderSwitch from "../../Utils/SliderSwitch";
import UserListTab from "../UserListTab";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase";

function Permission() {
  const userList = useSelector(getUserList);

  return (
    <div className="p-6">
      {userList.map((user) => {
        const userRef = doc(db, "users", user.id);
        const handleCanView = async (value) => {
          try {
            await updateDoc(userRef, {
              canView: value,
            });
          } catch (error) {
            console.log(error);
          }
        };
        const handleCanUpdate = async (value) => {
          try {
            await updateDoc(userRef, {
              canUpdate: value,
            });
          } catch (error) {
            console.log(error);
          }
        };

        return (
          <div
            className="mb-2 flex w-full flex-col items-center justify-between rounded-xl p-3 shadow-xl dark:shadow-sm dark:shadow-slate-50 lg:flex-row"
            key={user.id}>
            <UserListTab user={user} />
            {
              <div key={user.id}>
                <div className="flex gap-10">
                  <span className="flex items-center gap-2 font-bold">
                    CanView:{" "}
                    <SliderSwitch
                      hasAccess={user?.canView}
                      handleUpdate={handleCanView}
                      id={user.id + "1"}
                    />
                  </span>
                  <span className="flex items-center gap-2 font-bold">
                    CanEdit:{" "}
                    <SliderSwitch
                      hasAccess={user?.canUpdate}
                      handleUpdate={handleCanUpdate}
                      id={user.id + "2"}
                    />
                  </span>
                  {/* <span className="flex items-center gap-2 font-bold">
                    CanDelete:{" "}
                    <SliderSwitch
                      hasAccess={user.canDelete}
                      handleUpdate={handleCanDelete}
                      id={user.id + "3"}
                    />
                  </span> */}
                </div>
              </div>
            }
          </div>
        );
      })}
    </div>
  );
}

export default Permission;
