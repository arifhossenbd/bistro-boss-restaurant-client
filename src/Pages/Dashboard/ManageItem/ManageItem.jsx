import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import useMenu from "../../../Hooks/useMenu";

const ManageItem = () => {    
    const [ menu, refetch ] = useMenu();

    const handleDelete = (id) => {
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
                menu.delete(`/menu/${id}`)
                    .then(res => {
                        console.log(res);
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "menu has been deleted.",
                                icon: "success"
                            });

                        }
                    })

            }
        });
    }
    return (
        
        <div className="p-4">
            <h2 className="text-4xl text-center">UPDATE ITEM</h2>
            <div className=" bg-gray-100 shadow-lg rounded-lg mt-4">
                    <h2 className="text-3xl text-info p-4">Total Items:  {menu.length}</h2>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead>
                            <tr className="text-lg text-center text-white bg-orange-400 rounded-b-sm">
                                <th></th>
                                <th>ITEM IMAGE</th>
                                <th>ITEM NAME</th>
                                <th>PRICE</th>
                                <th>UPDATE</th>
                                <th>DELETE</th>
                            </tr>
                        </thead>
                        <tbody className="p-4">
                            {
                                menu?.map((item, index) =>
                                    <tr className="text-center" key={item._id}>
                                        <td className="text-base">{index + 1}</td>
                                        <td>
                                            <img className="avatar w-24 rounded-md" src={item.image} alt="" />
                                        </td>
                                        <td className="text-lg font-bold">{item.name}</td>
                                        <td className="text-lg">{item.price}</td>
                                        <td className="text-orange-400">
                                            <Link to={`/dashboard/updateItem/${item._id}`}><button className="btn btn-ghost hover:text-green-600 text-orange-500 hover:bg-orange-500"><FaEdit className="w-5 h-5"/></button></Link>
                                        </td>
                                        <td>
                                        <button onClick={() => handleDelete(item._id)} className="btn btn-ghost hover:text-red-600"><FaTrash className="w-5 h-5" /></button>
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

export default ManageItem;