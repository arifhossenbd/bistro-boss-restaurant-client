import Swal from "sweetalert2";
import SectionTitles from "../../../Components/SectionTitles/SectionTitles";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItem = () => {

    const { register, handleSubmit, reset, formState: { errors }, } = useForm();
    const [fileUrl, setFileUrl] = useState(null);
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        console.log(data);
        //image upload to imgbb and then get an url
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type' : 'multipart/form-data'
            }
        });
        console.log(res.data);
        if(res.data.success){
            //Now send the menu item data to the server with the image
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            }
            //Now 
            const menuRes = await axiosSecure.post('/menu', menuItem);
            console.log(menuRes.data);
            if(menuRes.data.insertedId){
                //Show success popup
                Swal.fire({
                    title: "Good job!",
                    text: `${data.name} is added to the menu`,
                    icon: "success"
                  });
                  reset()
            }
        }
    }

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


    return (
        <div>
            <SectionTitles
                subHeading="What's new?"
                heading="ADD AN ITEM"
            />
            <div className="bg-gray-200 m-8 p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="gap-4 mx-auto flex flex-col">
                    <div>
                        <h2>Recipe Name<span className="text-red-500">*</span></h2>
                        <input type="text" placeholder="Recipe name" {...register("name", { required: true })} className="input input-bordered w-full my-2" />
                        {errors.name && <span className="text-red-600">Recipe name is required</span>}
                    </div>
                    <div className="flex justify-between flex-col lg:flex-row items-center gap-2">
                        <div className="w-full">
                            <h2>Category<span className="text-red-500">*</span></h2>
                            <select defaultValue="default" {...register("category", { required: true })} className="select select-info w-full max-w-xs my-2">
                                <option disabled value="default">Pick the category</option>
                                <option>salad</option>
                                <option>drinks</option>
                                <option>popular</option>
                                <option>dessert</option>
                                <option>pizza</option>
                                <option>soup</option>
                                <option>offered</option>
                            </select>
                            {errors.category && <span className="text-red-600">Category is required</span>}
                        </div>
                        <div className="w-full">
                            <h2>Price<span className="text-red-500 my-2">*</span></h2>
                            <input type="text" placeholder="Price" {...register("price", { required: true })} className="input input-bordered w-full my-2" />
                            {errors.price && <span className="text-red-600">Price is required</span>}
                        </div>
                    </div>
                    <div className="py-2">
                        <h2>Recipe Details<span className="text-red-500">*</span></h2>
                        <textarea placeholder="Recipe Details" {...register("recipe", { required: true })} className="textarea textarea-bordered textarea-lg w-full my-2" ></textarea>
                        {errors.recipe && <span className="text-red-600">Recipe is required</span>}
                        <div className="flex gap-12">
                            <input
                                type="file"
                                {...register("image", { required: true })}
                                name="image"
                                id="image"
                                accept="image/*"
                                onChange={handleFile} className="file-input file-input-bordered w-full lg:max-w-xs" />
                            {errors.image && <span className="text-red-600">Image is required</span>}
                            {fileUrl && (
                                <div className="mt-2 w-96 rounded-lg overflow-hidden">
                                    <img
                                        src={fileUrl}
                                        alt="Uploaded"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <button className="bg-gradient-to-r from-orange-700 to-orange-300 py-2 md:w-36 gap-2 flex item-center justify-center text-white rounded-lg text-lg">Add Item <FaUtensils className="text-white mt-1"/></button>
                </form>
            </div>
        </div>
    );
};

export default AddItem;