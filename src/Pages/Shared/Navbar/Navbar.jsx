import { Link } from "react-router-dom";
import { images } from "../../../Constant";
import useAuth from "../../../Hooks/useAuth";
import useCart from "../../../Hooks/useCart";
import Swal from "sweetalert2";

const Navbar = () => {
    const {user, logOut} = useAuth()
    const [carts] = useCart()
    const totalPrice = carts.reduce((total, items) => total + items.price, 0)
    const handleLogOut = () => {
        logOut()
        .then((res) => {
            const logOut = res.user;
            Swal.fire({
                title: "Good job!",
                text: "You have logged out successfully!",
                icon: "success",
                logOut
              });
        })
        .catch(error => {
            console.log(error);
        })
    }
    const navLinks = <ul className="flex flex-col lg:flex-row items-center justify-center uppercase font-semibold">
        <li className=" hover:bg-gray-200 rounded-lg">
            <Link to="/">Home</Link>
        </li>
        <li className=" hover:bg-gray-200 rounded-lg">
            <Link>contact us</Link>
        </li>
        <li className=" hover:bg-gray-200 rounded-lg">
            <Link to="/dashboard">dashboard</Link>
        </li>
        <li className=" hover:bg-gray-200 rounded-lg">
            <Link to="/menu">Our Menu</Link>
        </li>
        <li className=" hover:bg-gray-200 rounded-lg">
            <Link to="/order-food/dessert">order food</Link>
        </li>
        <li className=" hover:bg-gray-200 rounded-lg">
            <Link to="/secret">secret</Link>
        </li>
    </ul>
    return (
        <div className="navbar bg-black fixed bg-opacity-20 z-10 text-white flex items-center justify-between px-12">
            <div className="flex items-center justify-center">
                <div className="dropdown flex items-center justify-center">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>
                <div className="flex gap-2">
                    <label><img className="w-20" src={images.logo} alt="" /></label>
                    <div className="flex flex-col uppercase">
                        <h2><Link to="/" className="text-4xl font-extrabold">Bistro Boss</Link></h2>
                        <h3><Link to="/" className="text-3xl font-bold">R e s t a u r a n t</Link></h3>
                    </div>
                </div>
            </div>
            <div className="">
                <div className="hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>
                <div className="flex-none flex items-center justify-center gap-2">
                    <div className="dropdown dropdown-end mr-2">
                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                <span className="badge badge-sm indicator-item text-red-500">{carts.length}</span>
                            </div>
                        </label>
                        <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-orange-100 shadow">
                            <div className="card-body">
                                <span className="font-bold text-lg text-orange-600">{carts.length} Items</span>
                                <span className="text-info">Subtotal: ${totalPrice}</span>
                                <div className="card-actions">
                                    <Link to="/dashboard/carts"><button className="btn hover:bg-yellow-400 bg-orange-300 normal-case px-8 text-lg btn-outline">View Cart</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dropdown dropdown-end">
                        { user ?
                            <div>
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img alt="" src={user.photoURL} />
                                    </div>
                                </label>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-yellow-600 rounded-box w-52">
                                    <li>
                                        <a className="justify-between">
                                            Profile
                                            <span className="badge">{user.email}</span>
                                        </a>
                                    </li>
                                    <li><a>Settings</a></li>
                                    <li onClick={handleLogOut}><a>Logout</a></li>
                                </ul>
                            </div>
                            :
                            <div>
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img alt="" src={images.profile} />
                                    </div>
                                </label>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-yellow-600 rounded-box w-52">
                                    <li><Link to="/login">Login</Link></li>
                                </ul>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;