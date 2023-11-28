
import PropTypes from 'prop-types';

const MenuItem = ({ items }) => {
    const { name, recipe, price, image } = items
    return (
        <div className='flex items-center gap-5'>
            <img className='w-24' style={{borderRadius: "0px 200px 200px 200px"}} src={image} alt="" />
            <div>
                <h2 className='text-lg'>{name} ------------------</h2>
                <p>{recipe}</p>
            </div>
            <p className='text-lg'>{price}</p>
        </div>
    );
};

MenuItem.propTypes = {
    items: PropTypes.object
};

export default MenuItem;