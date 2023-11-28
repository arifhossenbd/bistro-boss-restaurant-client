
import PropTypes from 'prop-types';
import MenuItem from '../../Shared/MenuItem/MenuItem';
import Cover from '../../Shared/Cover/Cover';
import { Link } from 'react-router-dom';

const MenuCategory = ({ items, title, img }) => {
    return (
        <div className='my-16'>
            {title &&
                <Cover
                    img={img} title={title}
                    details="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                />}
            <div className='flex flex-col items-center px-24'>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {
                        items?.map(item => <MenuItem key={item._id} items={item} />)
                    }
                </div>
                <Link to={`/order-food/${title}`}><button className="rounded-b-md border-b-black py-2 px-4 text-lg shadow-lg hover:bg-gray-700 hover:text-white border-b-2 rounded-md">View Full Item</button></Link>
            </div>
        </div>
    );
};

MenuCategory.propTypes = {
    items: PropTypes.array,
    title: PropTypes.string,
    img: PropTypes.string,
};

export default MenuCategory;