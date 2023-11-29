import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import OrderFood from "../Pages/OrderFood/OrderFood";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Registration/Registration";
import Secret from "../Pages/Shared/Secret/Secret";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import Cart from "../Pages/Dashboard/Cart/Cart";
import Admin from "../Pages/Dashboard/Admin/Admin";
import AddItem from "../Pages/Dashboard/AddItem/AddItem";
import ManageItem from "../Pages/Dashboard/ManageItem/ManageItem";
import AllUser from "../Pages/Dashboard/AllUser/AllUser";
import Contact from "../Pages/Dashboard/Contact/Contact";
import ManageBooking from "../Pages/Dashboard/ManageBooking/ManageBooking";
import AdminRoute from "./AdminRoute";
import UpdateItem from "../Pages/Dashboard/UpdateItem/UpdateItem";
import Payment from "../Pages/Dashboard/Payment/Payment";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children: [
        {
            path: "/",
            element: <Home/>
        },
        {
          path: "/order-food/:category",
          element: <OrderFood/>
        },
        {
          path: "/registration",
          element: <Registration/>
        },
        {
          path: "/login",
          element: <Login/>
        },
        {
          path: "/secret",
          element: <PrivateRoute> <Secret/> </PrivateRoute>
        }
      ]
    },
    {
      path: "/dashboard",
      element: <PrivateRoute><Dashboard/></PrivateRoute>,
      children: [
        // Admin only routes
        {
          path: "admin",
          element: <AdminRoute><Admin/></AdminRoute>
        },
        {
          path: "add-item",
          element: <AdminRoute><AddItem/></AdminRoute>
        },
        {
          path: "manage-item",
          element: <AdminRoute><ManageItem/></AdminRoute>
        },
        {
          path: "updateItem/:id",
          element: <AdminRoute><UpdateItem/></AdminRoute>,
          loader: ({params}) => fetch(`http://localhost:5000/menu/${params.id}`)
        },
        {
          path: "manage-booking",
          element: <AdminRoute><ManageBooking/></AdminRoute>
        },
        {
          path: "all-users",
          element: <AdminRoute><AllUser/></AdminRoute>
        },
        // Normal Route
        {
          path: "menu",
          element: <Menu/>
        },
        {
          path: "carts",
          element: <Cart/>
        },
        {
          path: "contact",
          element: <Contact/>
        },
        {
          path: "payment",
          element: <Payment/>
        }

      ]
    }
  ]);
export default router;