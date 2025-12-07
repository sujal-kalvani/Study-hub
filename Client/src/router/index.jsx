import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import ReactDOM from "react-dom/client";
import Home from "../pages/Home";
import About from "../pages/About";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "/about", element: <About/>},
      { path: "/signup", element: <SignUp/>},
      { path: "/signin", element: <SignIn/>},
    ],
  },
]);


export default router