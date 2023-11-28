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
import ManageOrder from "../Pages/Dashboard/ManageOrder/ManageOrder";
import AllUser from "../Pages/Dashboard/AllUser/AllUser";
import Contact from "../Pages/Dashboard/Contact/Contact";

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
          path: "/menu",
          element: <Menu/>
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
        {
          path: "admin",
          element: <Admin/>
        },
        {
          path: "add-item",
          element: <AddItem/>
        },
        {
          path: "manage-item",
          element: <ManageItem/>
        },
        {
          path: "manage-order",
          element: <ManageOrder/>
        },
        {
          path: "all-users",
          element: <AllUser/>
        },
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
        }

      ]
    }
  ]);
export default router;