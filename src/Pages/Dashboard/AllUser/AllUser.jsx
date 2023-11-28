import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaTrash, FaUser } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUser = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })
    console.log(users);
    const handleMakeAdmin = user => {
        console.log(user);
        Swal.fire({
            title: "Are you sure make him/her admin?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make him/her!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/admin/${user._id}`)
                    .then(res => {
                        console.log(res);
                        if (res.data.modifiedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: `${user.displayName} is an admin now!`,
                                text: "User has been modified admin.",
                                icon: "success"
                            });

                        }
                    })

            }
        });
    }

    const handleUserDelete = (id) => {
        console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${id}`)
                    .then(res => {
                        console.log(res);
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "User has been deleted.",
                                icon: "success"
                            });

                        }
                    })

            }
        });
    }

    return (
        <div className="px-4">
            <div className=" bg-gray-100 shadow-lg rounded-lg">
                <div className="flex justify-between text-center items-center">
                    <h2 className="text-3xl text-info">Total Users:  {users.length}</h2>
                    <div><button className="bg-yellow-600 text-white text-lg rounded-lg px-4 py-2">Pay</button></div>
                </div>
                <div className="overflow-x-auto pt-8">
                    <table className="table table-zebra">
                        <thead>
                            <tr className="text-center text-lg text-white bg-yellow-500 rounded-b-sm">
                                <th></th>
                                <th>IMAGE</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>ROLE</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {
                                users?.map((user, index) =>
                                    <tr key={user._id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <img className="avatar rounded-md" src={user.photoURL} alt="" />
                                        </td>
                                        <td className="font-bold">{user.displayName}</td>
                                        <td className="">{user.email}</td>
                                        <td className="text-orange-400">
                                            {
                                                user.role === 'admin' ? 'Admin' : <button onClick={() => handleMakeAdmin(user)}><FaUser className="w-4 h-4" /></button>
                                            }
                                        </td>
                                        <td>
                                            <button onClick={() => handleUserDelete(user._id)} className="btn btn-ghost hover:text-red-600"><FaTrash className="w-5 h-5" /></button>
                                        </td>
                                    </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllUser;