import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import './styles.css';

import { Pagination } from 'swiper/modules';
import images from '../../../Constant/images';
import SectionTitles from '../../../Components/SectionTitles/SectionTitles';

const Category = () => {
    return (
        <>
        <SectionTitles
        subHeading="From 11:00am to 10:00pm"
        heading="ORDER ONLINE"
        />
            <div className="my-12 uppercase text-white">
                <Swiper
                    slidesPerView={4}
                    spaceBetween={20}
                    centeredSlides={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <img src={images.categoryImg1} alt="" />
                        <p className='font-semibold text-2xl -mt-10'>salads</p>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={images.categoryImg2} alt="" />
                        <p className='font-semibold text-2xl -mt-10'>pizzas</p>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={images.categoryImg3} alt="" />
                        <p className='font-semibold text-2xl -mt-10'>soups</p>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={images.categoryImg4} alt="" />
                        <p className='font-semibold text-2xl -mt-10'>desserts</p>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={images.categoryImg5} alt="" />
                        <p className='font-semibold text-2xl -mt-10'>salads</p>
                    </SwiperSlide>
                </Swiper>
            </div>
        </>
    );
};

export default Category;