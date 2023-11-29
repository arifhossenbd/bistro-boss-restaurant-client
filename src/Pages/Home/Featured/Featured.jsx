
import SectionTitles from "../../../Components/SectionTitles/SectionTitles";
import { images } from "../../../Constant";

const Featured = () => {
    return (
        <div style={{backgroundImage: `url(${images.featured})`}} className="p-4 bg-fixed my-12 text-gray-200">
            <SectionTitles
                subHeading="Check it out"
                heading="FROM OUR MENU"
            />
            <div className="w-9/12 mx-auto flex gap-5 my-12">
                <img className="w-1/2" src={images.featured} alt="" />
                <div className="text-base-100">
                    <h2 className="text-xl">March 20, 2023</h2>
                    <h3 className="text-xl py-2">WHERE CAN I GET SOME?</h3>
                    <p className="pb-4">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
                        repudiandae quis exercitationem maiores nulla, at nostrum enim
                        possimus tempora debitis? Perferendis est atque corporis ea modi
                        accusantium exercitationem molestias consequuntur. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse, sapiente officia, quidem pariatur, doloribus laudantium mollitia cumque est magni quo doloremque. Aperiam magni tenetur repellendus reiciendis sequi error consequuntur earum.
                    </p>
                    <button className="rounded-b-md py-1 px-2 shadow-lg hover:bg-gray-700 border-b-2 rounded-md">Read More</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;
