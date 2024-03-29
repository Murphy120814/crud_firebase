import React, { useEffect } from "react";
import { toggleDarkMode } from "./slices/themeSlice";
import { Provider } from "react-redux";
import { createBrowserRouter, Outlet } from "react-router-dom";
import {
  UserFormikForm,
  NotFound,
  Authentication,
  Home,
  Navbar,
  Footer,
  Permission,
  ViewContainer,
  EditUser,
  ForgotPassword,
  Notification,
} from "./components";
import store from "./store/store";
export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Authentication />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/permission",
        element: <Permission />,
      },
      {
        path: "/addUser",
        element: <UserFormikForm />,
      },
      {
        path: "/viewUser/:uid",
        element: <ViewContainer />,
      },
      {
        path: "/editUser/:uid",
        element: <EditUser />,
      },
      {
        path: "/resetPassword",
        element: <ForgotPassword />,
      },
      {
        path: "/*",
        element: <NotFound />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

function App() {
  useEffect(() => {
    if (window.localStorage.getItem("darkMode") === "true") {
      store.dispatch(toggleDarkMode());
    }
  }, []);
  return (
    <div className="relative">
      <div className=" flex min-h-screen w-full flex-col items-center justify-between bg-white text-black dark:bg-black dark:text-white">
        <Provider store={store}>
          <Navbar />
          <div className="mt-4 min-h-[80vh] w-full">
            {" "}
            <Outlet />
          </div>
          <Footer />
          <Notification />
        </Provider>
      </div>
    </div>
  );
}

export default App;
