import PropTypes from 'prop-types';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useCart from '../../Hooks/useCart';
const FoodCard = ({ items }) => {
    const { user } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [, refetch] = useCart()
    const { name, image, price, recipe } = items;
    const axios = useAxiosSecure()

    const handleAddToCart = () => {
        if (user && user.email) {
            //Send cart item to the database
            const cartItem = { email: user.email, name, image, price}
            axios.post('/carts', cartItem)
            .then(res => {
                if(res.data.insertedId){
                    Swal.fire(
                        "Well Done!",
                        `${name} added to your cart`,
                        "success"
                    );
                    refetch()
                }
            })
        } else {
            Swal.fire({
                title: "You are not logged in",
                text: "Please login to add to the cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login Please!"
            }).then((result) => {
                if (result.isConfirmed) {
                    // Send user to the login page
                    navigate('/login', {state: {from: location}})
                }
            });
        }
    }
    
    
    return (
        <div className='mt-6'>
            <div className="card card-compact w-96 bg-base-100 shadow-xl">
                <figure><img className='w-full relative' src={image} alt="Food" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <p>{recipe}</p>
                    <p className='absolute bottom-0 top-0 pt-1 right-0 bg-gray-800 w-16 h-7 items-center bg-opacity-70 text-white text-center m-4'>{price}</p>
                    <div className="card-actions justify-center mt-5 mb-2">
                        <button onClick={handleAddToCart} className="shadow-2xl btn-ghost text-yellow-600 hover:bg-black bg-gray-100 px-8 py-2 rounded-lg border-b-yellow-600 border-b-4 text-md">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

FoodCard.propTypes = {
    items: PropTypes.object
};

export default FoodCard;