
import PropTypes from 'prop-types';

const SectionTitles = ({heading, subHeading}) => {
    return (
        <div className='text-center mx-auto w-1/2 pt-8'>
            <p className='lg:text-md text-yellow-600 py-2'>---{subHeading}---</p>
            <h2 className='lg:text-4xl text-xl font-medium border border-y-4 py-4 border-x-0'>{heading}</h2>
        </div>
    );
};

SectionTitles.propTypes = {
    heading: PropTypes.node,
    subHeading: PropTypes.node
};

export default SectionTitles;