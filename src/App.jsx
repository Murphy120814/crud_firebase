import React from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { NotFound, Authentication, Home, Navbar, Footer } from "./components";
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
        path: "/*",
        element: <NotFound />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

function App() {
  return (
    <div className="">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
