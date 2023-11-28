import { Parallax } from 'react-parallax';
import PropTypes from 'prop-types';
const Cover = ({ img, title, details }) => {
    return (
        <div className='mb-16'>
            <Parallax
                blur={{ min: -50, max: 50 }}
                bgImage={img}
                strength={-200}
            >
            <div className="hero h-[600px]">
                <div className="hero-overlay bg-opacity-60"></div>
                <div className=" bg-black px-24 py-12 opacity-50">
                    <div className="max-w-md text-center text-white opacity-100">
                        <h1 className="mb-5 text-5xl font-bold uppercase">{title}</h1>
                        <p>{details}</p>
                    </div>
                </div>
            </div>
            </Parallax>
        </div>
    );
};

Cover.propTypes = {
    img: PropTypes.node,
    title: PropTypes.node,
    details: PropTypes.node,
};

export default Cover;