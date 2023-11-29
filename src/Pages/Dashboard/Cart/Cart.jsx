import { FaTrash } from "react-icons/fa";
import useCart from "../../../Hooks/useCart";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Cart = () => {
    const [cart, refetch] = useCart();
    console.log(cart);
    const totalPrice = cart.reduce((total, items) => total + items.price, 0)
    const axios = useAxiosSecure()

    const handleCartDelete = (id) => {
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
            axios.delete(`/carts/${id}`)
            .then(res => {
                console.log(res);
                if(res.data.deletedCount > 0){
                    refetch()
                      Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                      });

                }
            })

            }
          });
    }
    return (
        <div className="max-w-screen-lg mx-auto border border-b-2 bg-base-100 shadow-lg rounded-lg p-4">
            <div className="p-8 bg-gray-100 shadow-lg rounded-lg">
                <div className="flex justify-between text-center items-center">
                    <h2 className="text-3xl text-info">Total Orders:  {cart.length}</h2>
                    <h2 className="text-2xl text-yellow-600">Total Price: $ {totalPrice}</h2>
                    {
                        cart.length ? <Link to="/dashboard/payment"><button className="hover:bg-yellow-600 bg-yellow-400 btn btn-ghost text-white text-lg rounded-lg px-4 py-2">Pay</button></Link>
                        :
                        <button disabled className="hover:bg-yellow-600 btn btn-ghost text-white text-lg rounded-lg px-4 py-2">Pay</button>
                    }
                </div>
                <div className="p-8">
                    <table className="table bg-yellow-500 rounded-b-sm">
                        <thead className="px-4">
                            <tr className="flex justify-between items-center text-center text-lg text-white">
                                <th></th>
                                <th>ITEM IMAGE</th>
                                <th>ITEM NAME</th>
                                <th>PRICE</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                    </table>
                    {
                        cart.map((item, index) => <div key={item._id} className="">
                            <table className="table">
                                {/* head */}
                                <tbody>
                                    <tr className="flex justify-between items-center text-center px-8">
                                        <th>{index + 1}</th>
                                        <td>
                                            <img className="w-24" src={item.image} alt="" />
                                        </td>
                                        <td className="font-bold w-48">{item.name}</td>
                                        <td>{item.price}</td>
                                        <th>
                                            <button onClick={() => handleCartDelete(item._id)} className="btn btn-ghost hover:text-red-600"><FaTrash className="w-5 h-5" /></button>
                                        </th>
                                    </tr>
                                </tbody>

                            </table>
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Cart;