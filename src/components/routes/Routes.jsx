import { createBrowserRouter } from "react-router";
import Home from "../Home/Home";
import Root from "../Root/Root";
import NotFound from "../ErrorElement/NotFound";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import AddBook from "../Dashboard/AddBook";
import BookDetails from "../bookDetails page/BookDetails";
import CategoryBooks from "../Dashboard/CategoryBooks";
import OrderPage from "../../Order/OrderPage";
import MyBooks from "../Dashboard/MyBooks ";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <NotFound></NotFound>,
    children: [
        {
            index: true,
            Component: Home,
        },
        {
          path: "/addbooks",
          Component: AddBook,
        },
        {
          path: "/books/:id",
          Component: BookDetails,
        },
        {
          path: "/category/:category",
          Component: CategoryBooks,
        },
        {
          path:"/order/:id",
          Component: OrderPage,
        },
        {
          path: "/my-books",
          Component: MyBooks,
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