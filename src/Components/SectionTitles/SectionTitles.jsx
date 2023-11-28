
import PropTypes from 'prop-types';

const SectionTitles = ({heading, subHeading}) => {
    return (
        <div className='text-center mx-auto w-1/2 my-12'>
            <p className='text-md text-yellow-600 my-2'>---{subHeading}---</p>
            <h2 className='text-4xl font-medium border border-y-4 py-4 border-x-0'>{heading}</h2>
        </div>
    );
};

SectionTitles.propTypes = {
    heading: PropTypes.node,
    subHeading: PropTypes.node
};

export default SectionTitles;