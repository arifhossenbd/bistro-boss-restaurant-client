import { FaAd, FaCalendar, FaHome, FaList, FaShoppingCart, FaUserFriends } from "react-icons/fa";
import { FcMenu } from "react-icons/fc";
import { TbBrandBooking } from "react-icons/tb";
import { IoMdMail } from "react-icons/io";
import { Link, Outlet } from "react-router-dom";
import useCart from "../Hooks/useCart";
import useAdmin from "../Hooks/useAdmin";

const Dashboard = () => {
    const [cart] = useCart()
    const [isAdmin] = useAdmin()
    return (
        <div>
            <div className="flex">
                <div className=" bg-orange-300 h-fit py-2 menu text-lg uppercase space-y-4">
                    {/* Admin Route */}
                    {
                        isAdmin ?
                            <>
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
                                    <Link to="/dashboard/manage-booking"><TbBrandBooking /> Manage Booking</Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/all-users"><FaUserFriends /> all users</Link>
                                </li>
                            </>
                            :
                            <>
                                <li>
                                    <Link to="/dashboard/userHome">
                                        <FaHome></FaHome>
                                        User Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/history">
                                        <FaCalendar></FaCalendar>
                                        Not History
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/cart">
                                        <FaShoppingCart></FaShoppingCart>
                                        My Cart ({cart.length})
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/review">
                                        <FaAd></FaAd>
                                        Add a Review
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/paymentHistory">
                                        <FaList></FaList>
                                        Real Payment History
                                    </Link>
                                </li>
                            </>
                    }
                    {/* Normal Route */}
                    <>
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
                    </>
                </div>
                <div className="flex-1">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;