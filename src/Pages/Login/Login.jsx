import { useEffect, useState } from "react";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import useAuth from "../../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { images } from "../../Constant";
import { Helmet } from "react-helmet-async";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";

const Login = () => {


    const { signInUser } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signInUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: 'User Login Successful.',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
                navigate(from, { replace: true });
            })
    }

    const handleCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false);
        }
        else {
            setDisabled(true)
        }
    }

    return (
        <div style={{ height: "720px", backgroundImage: `url(${images.authenticationBg})` }} className="pt-5 w-full h-screen shadow-xl mx-auto">
            <Helmet>
                <title>Bistro Boss | Login</title>
            </Helmet>
            <div className="flex flex-col lg:flex-row items-center max-h-screen mx-auto justify-center">
                <div className="w-1/2 mx-auto">
                    <img src={images.authentication} alt="" />
                </div>
                <div className="card w-[420px] md:w-[520px]">
                    <form onSubmit={handleLogin} className="card-body">
                        <h1 className="text-4xl font-bold text-center">Login now!</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-xl font-semibold">Email</span>
                            </label>
                            <input type="email" placeholder="Email" name="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text text-xl font-semibold">
                                    Password
                                </span>
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                name="password"
                                className="input text-black  input-bordered pr-10"
                            />
                            <span
                                className="text-2xl text-black absolute top-14 md:ml-96 md:-mr-40 xl:ml-96 xl:-mr-24 ml-80"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                            </span>
                        </div>
                        <div className="form-control w-full">
                            <h2 className="py-2"> <LoadCanvasTemplate /></h2>
                            <input onBlur={handleCaptcha} type="text" name="captcha" placeholder="type the captcha above" className="input input-bordered" />

                        </div>
                        <div className="form-control mt-4">
                            {/* TODO: Disabled functtion false */}
                            <input disabled={disabled} className="btn btn-outline bg-orange-200 text-orange-600 text-xl font-bold" type="submit" value="Login" />
                        </div>
                        <div className="mx-auto text-center space-y-2 text-lg font-medium mt-2">
                            <h2>New here? <Link className="link-hover" to="/registration">Create a New Account</Link></h2>
                            <div className="flex items-center justify-center mx-auto gap-2">
                                <hr className="flex-grow border-t-2 border-blue-300 mx-auto" />
                                Or sign in with
                                <hr className="flex-grow border-t-2 border-blue-300 mx-auto" />
                            </div>
                        </div>
                        <SocialLogin />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;