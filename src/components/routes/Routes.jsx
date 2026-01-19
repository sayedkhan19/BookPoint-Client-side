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
import AllBookBrowse from "../Home/AllBookBrowse";
import OrderSuccess from "../Oerders_manages/OrderSuccess";
import PaymentPage from "../Oerders_manages/PaymentPage";
import MyOrders from "../Oerders_manages/MyOrders";
import AdminOrders from "../Oerders_manages/AdminOrders";
import MyProfile from "../myProfile/MyProfile";
import AdminRoute from "../myProfile/AdminRoute";


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
        },
        {
          path: "/all-books",
          Component: AllBookBrowse,
             },
        {
          path: "/order-success",
          Component: OrderSuccess,
        },
        {
          path: "/payment/:method",
          Component: PaymentPage,
        },
        {
          path: "/my-orders",
          Component: MyOrders,
        },
        {
          path:  "/admin/orders",
          Component: AdminOrders,
        },

        {
  path: "/profile",
  Component: MyProfile,
},

{
  path: "/admin/orders",
  element: (
    <AdminRoute>
      <AdminOrders />
    </AdminRoute>
  ),
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