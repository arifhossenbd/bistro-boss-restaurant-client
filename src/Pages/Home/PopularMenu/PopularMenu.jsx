import SectionTitles from "../../../Components/SectionTitles/SectionTitles";
import useMenu from "../../../Hooks/useMenu";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const PopularMenu = () => {
    const [menu] = useMenu();
    const popular = menu.filter(item => item.category === 'popular');
    return (
        <section className="my-12 flex flex-col items-center space-y-8">
            <SectionTitles
                heading="FROM OUR MENU"
                subHeading="Check it out"
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {
                    popular?.map(item => <MenuItem key={item._id} items={item} />)
                }
            </div>
            <button className="rounded-b-md border-b-black py-2 px-4 text-lg shadow-lg hover:bg-gray-700 hover:text-white border-b-2 rounded-md">View Full Menu</button>
        </section>
    );
};

export default PopularMenu;