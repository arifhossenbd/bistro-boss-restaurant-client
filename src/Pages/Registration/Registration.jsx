import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form"
import { Helmet } from "react-helmet-async";
import { images } from "../../Constant";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";

const Registration = () => {
    const axiosPublic = useAxiosPublic();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const { updateUserProfile, createUser, } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [fileUrl, setFileUrl] = useState(null);

    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const handleFile = (event) => {
        const files = event.target.files;
        if (files.length > 0 && files[0].type.startsWith("image/")) {
            const url = URL.createObjectURL(files[0]);
            setFileUrl(url);
        } else {
            Swal.fire({
                icon: "error",
                title: "Invalid File Type",
                text: "Please upload only image files.",
            });
        }
    };


    const onSubmit = (data) => {
        console.log(data);
        createUser(data.email, data.password)
            .then((result) => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.email, fileUrl)
                    .then(() => {
                        const userInfo = {
                            displayName: data.name,
                            email: data.email,
                            photoURL: fileUrl,
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('User added to the database');
                                    Swal.fire(
                                        "Well Done!",
                                        "You have logged in successfully!",
                                        "success",
                                        loggedUser
                                    );
                                    reset();
                                }
                            })
                        navigate(from, { replace: true });
                    })
                    .catch((error) => console.log(error));
            });
    };

    return (
        <div style={{ height: "720px", backgroundImage: `url(${images.authenticationBg})` }} className="pt-5 w-full h-screen shadow-xl px-24">
            <Helmet>
                <title>Bistro Boss | Registration</title>
            </Helmet>
            <div className="flex flex-col lg:flex-row-reverse items-center max-h-screen mx-auto justify-around">
                <div className="mx-auto w-1/2">
                    <img src={images.authentication} alt="" />
                </div>
                <div className="w-[420px] md:w-[520px]">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <h1 className="text-4xl font-bold text-center">Registration now!</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-xl font-semibold">Name</span>
                            </label>
                            <input type="text" placeholder="Name" {...register("name", { required: true })} className="input input-bordered" />
                            {errors.name && <span className="text-red-600">Name is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-xl font-semibold">Email</span>
                            </label>
                            <input type="email" placeholder="Email" {...register("email", { required: true })} name="email" className="input input-bordered" />
                            {errors.email && <span className="text-red-600">Email is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-xl font-semibold">Photo</span>
                            </label>
                            <div>
                                <input
                                    type="file"
                                    {...register("photoURL", { required: true })}
                                    name="photo"
                                    id="photo"
                                    accept="image/*"
                                    onChange={handleFile}
                                />
                                {errors.photoURL && <span className="text-red-600">Photo is required</span>}
                                {fileUrl && (
                                    <div className="mt-2 w-32 h-32 rounded-full overflow-hidden">
                                        <img
                                            src={fileUrl}
                                            alt="Uploaded"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text text-xl font-semibold">
                                    Password
                                </span>
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password" {...register("password", { required: true, minLength: 7, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ })}
                                name="password"
                                className="input text-black  input-bordered pr-10"
                            />
                            {/* {errors.password && <span className="text-red-600">Password is required</span>} */}
                            {errors.password?.type === 'minLength' && <span className="text-red-600">Password must be at least 8 characters long</span>}
                            {errors.password?.type === 'pattern' && <span className="text-red-600">At least one digit, lowercase, uppercase letter, special character is required</span>}
                            <span
                                className="text-2xl text-black absolute top-14 md:ml-96 md:-mr-36 xl:ml-96 xl:-mr-24 ml-80"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                            </span>
                        </div>
                        <div className="form-control mt-6">
                            <input type="submit" className='btn btn-outline bg-orange-200 text-orange-600 text-xl font-bold' value="Registration" />
                        </div>
                        <div className="mx-auto text-center space-y-2 text-lg font-medium mt-2">
                            <h2>Already registered? <Link className="link-hover" to="/login">Go to log in</Link></h2>
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

export default Registration;