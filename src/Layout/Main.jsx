import { Outlet } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const Main = () => {
    const noHeaderFooder = location.pathname.includes('login') || location.pathname.includes('registration')
    return (
        <>
            <div>
                {noHeaderFooder || <Navbar />}
                <Outlet />
                {noHeaderFooder || <Footer />}
            </div>
        </>
    );
};

export default Main;