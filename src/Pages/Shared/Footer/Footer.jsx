import { useLocation, useNavigate } from "react-router-dom";
import { images } from "../../../Constant";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Loading from "../../../Components/Loading/Loading";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaGithub } from "react-icons/fa";

const Footer = () => {

    const axiosPublic = useAxiosPublic()
    const { signInGoogle, signInFacebook, signInGitHub, loading } = useAuth()
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInGoogle();
            const logInUser = result.user;
            const userInfo = {
                email: result.user?.email,
                displayName: result.user?.displayName,
                photoURL: result.user?.photoURL
            }
            axiosPublic.post('/users', userInfo)
                .then(res => {
                    console.log(res.data);
                    if (loading) {
                        return <Loading />
                    } else {
                        Swal.fire(
                            "Well Done!",
                            "You have logged in successfully!",
                            "success",
                            logInUser,
                            navigate(from, { replace: true })
                        );
                    }
                })
        } catch (error) {
            Swal.fire({
                icon: "error",
                footer: error.message,
            });
        }
    };

    const handleFacebookSignIn = async () => {
        try {
            const result = await signInFacebook();
            const logInUser = result.user;
            console.log(logInUser);
            Swal.fire(
                "Well Done!",
                "You have logged in successfully!",
                "success",
                logInUser,
                loading(true),
                navigate(from, { replace: true })
            );
        } catch (error) {
            Swal.fire({
                icon: "error",
                footer: error.message,
            });
        }
    };

    const handleGitHubSignIn = async () => {
        try {
            const result = await signInGitHub();
            const logInUser = result.user;
            console.log(logInUser);
            Swal.fire(
                "Well Done!",
                "You have logged in successfully!",
                "success",
                logInUser,
                navigate(from, { replace: true })
            );
        } catch (error) {
            Swal.fire({
                icon: "error",
                footer: error.message,
            });
        }
    };

    const date = new Date().toLocaleString('en-us',{year:'numeric'})
    

    return (
        <div className=" bg-neutral text-white px-12 pt-8">
            <div className="flex justify-between">
                <div>
                    <img className="w-20" src={images.logo} alt="" />
                    <p>Bistro Boss Restaurant Industries Ltd.<br />Providing reliable tech since 1992</p>
                </div>
                <div className="divider divide-x-2 divide-white border h-24"></div>
                <div>
                    <header className="footer-title">Social</header>
                    <div className="grid grid-flow-col gap-4">
                        <h2 className="border-gray-700 border-2 p-2 w-fit h-fit rounded-full hover:link" onClick={handleGoogleSignIn}>
                            <FcGoogle className="w-7 h-7"></FcGoogle>
                        </h2>
                        <h2 className="border-gray-700 border-2 p-2 w-fit h-fit rounded-full hover:link" onClick={handleFacebookSignIn}>
                            <FaFacebook className="w-7 h-7"></FaFacebook>
                        </h2>
                        <h2 className="border-gray-700 border-2 p-2 w-fit h-fit rounded-full hover:link" onClick={handleGitHubSignIn}>
                            <FaGithub className="w-7 h-7"></FaGithub>
                        </h2>
                    </div>
                </div>
            </div>
            <h2 className="text-center w-full py-4">Copyright © {date} - All right reserved by Bistro Boss Restaurant Industries Ltd</h2>
        </div>
    );
};

export default Footer;