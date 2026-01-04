import { createBrowserRouter } from "react-router";
import Home from "../Home/Home";
import Root from "../Root/Root";
import NotFound from "../ErrorElement/NotFound";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <NotFound></NotFound>,
    children: [
        {
            index: true,
            Component: Home,
        }
    ]
    
    
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      }
    ]
  }
]);