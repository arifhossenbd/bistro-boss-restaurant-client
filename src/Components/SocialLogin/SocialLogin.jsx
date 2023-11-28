import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaGithub } from "react-icons/fa";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Loading from "../Loading/Loading";

const SocialLogin = () => {

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
                if(loading){
                    return <Loading/>
                } else{
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
    return (
        <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center gap-4 md:gap-6 lg:gap-8 mx-auto">
                <h2 className="border-gray-700 border-2 p-2 w-fit h-fit rounded-full hover:link" onClick={handleGoogleSignIn}>
                    <FcGoogle className="w-10 h-10"></FcGoogle>
                </h2>
                <h2 className="border-gray-700 border-2 p-2 w-fit h-fit rounded-full hover:link" onClick={handleFacebookSignIn}>
                    <FaFacebook className="w-10 h-10"></FaFacebook>
                </h2>
                <h2 className="border-gray-700 border-2 p-2 w-fit h-fit rounded-full hover:link" onClick={handleGitHubSignIn}>
                    <FaGithub className="w-10 h-10"></FaGithub>
                </h2>
            </div>
        </div>
    );
};

export default SocialLogin;