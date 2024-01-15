import React from "react";
import { Provider } from "react-redux";
import { createBrowserRouter, Outlet } from "react-router-dom";
import {
  NotFound,
  Authentication,
  Home,
  Navbar,
  Footer,
  Permission,
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
        path: "/*",
        element: <NotFound />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

function App() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-between bg-white text-black dark:bg-black dark:text-white">
      <Provider store={store}>
        <Navbar />
        <div className="min-h-[80vh]">
          {" "}
          <Outlet />
        </div>
        <Footer />
      </Provider>
    </div>
  );
}

export default App;
