import { useEffect, useState } from "react";
import SectionTitles from "../../../Components/SectionTitles/SectionTitles";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

const Testimonial = () => {

    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/reviews')
            .then(res => res.json())
            .then(data => setReviews(data));
    }, []);

    return (
        <section>
            <SectionTitles
                subHeading="What Our Clients Say"
                heading="TESTIMONIALS"
            />
            <Swiper className="mySwiper" navigation={true} modules={[Navigation]}>
                {reviews.map(item => (
                    <SwiperSlide key={item._id} className="swiper-slide">
                        <div className="flex flex-col items-center text-center space-y-2 mx-12">
                            <Rating className="mt-32"
                                style={{ maxWidth: 180 }}
                                value={item.rating}
                            />
                            <p>{item.details}</p>
                            <h2 className="text-2xl">{item.name}</h2>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Testimonial;
