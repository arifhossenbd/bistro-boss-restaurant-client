import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { images } from "../../../Constant";
const Banner = () => {
    return (
        <div>
            <Carousel>
                <div className="h-96">
                    <img src={images.carousel1} />
                </div>
                <div>
                    <img src={images.carousel2} />
                </div>
                <div>
                    <img src={images.carousel3} />
                </div>
                <div>
                    <img src={images.carousel4} />
                </div>
                <div>
                    <img src={images.carousel5} />
                </div>
                <div>
                    <img src={images.carousel6} />
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;