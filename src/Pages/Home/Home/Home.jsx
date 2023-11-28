import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import Featured from "../Featured/Featured";
import PopularMenu from "../PopularMenu/PopularMenu";
import Testimonial from "../Testimonial/Testimonial";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Home</title>
            </Helmet>
            <Banner />
            <div className="mx-auto max-w-screen-lg">
                <Category />
                <PopularMenu />
                <Featured/>
                <Testimonial/>
            </div>
        </div>
    );
};

export default Home;