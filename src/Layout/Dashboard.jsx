import { FaHome, FaList, FaShoppingCart, FaUserFriends } from "react-icons/fa";
import { FcMenu } from "react-icons/fc";
import { TbBrandBooking } from "react-icons/tb";
import { IoMdMail } from "react-icons/io";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import useCart from "../Hooks/useCart";
import useAdmin from "../Hooks/useAdmin";

const Dashboard = () => {
    const [cart] = useCart()
    const [isAdmin] = useAdmin()
    return (
        <div>
            <Navbar />
            <div className="flex">
                <div className=" bg-orange-300 w-60 h-screen py-28">
                    {
                        isAdmin ?
                            <>
                                <ul className="menu text-lg uppercase space-y-4">
                                    <li>
                                        <Link to="/dashboard/admin"><FaHome /> Admin Home</Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard/add-item"><FaList /> add items</Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard/manage-item"><FcMenu /> manage items</Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard/manage-order"><TbBrandBooking /> Manage orders</Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard/all-users"><FaUserFriends /> all users</Link>
                                    </li>
                                </ul>
                            </>
                            :
                            <>
                                <ul className="menu text-lg uppercase space-y-4">
                                    <li>
                                        <Link to='/'><FaHome /> Home</Link>
                                    </li>
                                    <li>
                                        <Link to='/dashboard/menu'><FcMenu /> Menu</Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard/carts"><FaShoppingCart /> My Cart ({cart.length})</Link>
                                    </li>
                                    <li>
                                        <Link to='/dashboard/contact'><IoMdMail /> Contact</Link>
                                    </li>
                                </ul>
                            </>
                    }
                </div>
                <div className="flex-1  py-24">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;