import { createBrowserRouter } from "react-router";
import Home from "../Home/Home";
import Root from "../Root/Root";
import NotFound from "../ErrorElement/NotFound";


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
]);