import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import ReactDOM from "react-dom/client";
import Home from "../pages/Home";
import About from "../pages/About";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import ChangePassword from "../pages/ChangePassword";
import Educator_dashboard from "../pages/Educator_dashboard";
import Dashbaord from "../Components/Educator/Dashbaord";
import AddCourses from "../Components/Educator/AddCourses";
import MyCourses from "../Components/Educator/MyCourses";
import StudentEnrolled from "../Components/Educator/StudentEnrolled"
import CardDetails from "../Components/user/CardDetails";
import Payment_success from "../pages/Payment_success";
import Payment_failed from "../pages/Payment_failed";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/signin", element: <SignIn /> },
      { path: "/changePassword", element: <ChangePassword /> },
      { path:"/course-card/:id", element:<CardDetails/>},
      { path:"/payment-success", element:<Payment_success/>},
      { path:"/payment-fail", element:<Payment_failed/>},

      {
        path: "/educator-dashboard", element: <Educator_dashboard />,
        children: [
          {
            path: "Dashboard",
            element: <Dashbaord />
          },

          {
            path: "Add-course",
            element: <AddCourses/>
          },

          {
            path: "My-courses",
            element: <MyCourses />
          },

          {
            path: "StudentEnrolled",
            element: <StudentEnrolled/>
          },
        ]
      }
    ],
  },
]);


export default router