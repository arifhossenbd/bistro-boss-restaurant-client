import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import { images } from "../../../Constant";
import useMenu from "../../../Hooks/useMenu";
import SectionTitles from "../../../Components/SectionTitles/SectionTitles";
import MenuCategory from "../MenuCategory/MenuCategory";

const Menu = () => {
    const [menu] = useMenu();
    const offered = menu.filter(item => item.category === 'offered');
    const dessert = menu.filter(item => item.category === 'dessert');
    const pizza = menu.filter(item => item.category === 'pizza');
    const salad = menu.filter(item => item.category === 'salad');
    const soup = menu.filter(item => item.category === 'soup');
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>
            <div>
                <Cover
                img={images.menuBanner}
                title="Our Menu"
                />
                <SectionTitles
                subHeading="Don't Miss"
                heading="TODAY'S OFFER"
                />
                {/* Offerd menu items */}
                <MenuCategory items={offered}></MenuCategory>
                
                {/* Desserts menu items */}
                <MenuCategory items={dessert}
                title="dessert"
                img={images.dessert}
                ></MenuCategory>
                
                {/* Pizza menu items */}
                <MenuCategory items={pizza}
                title="pizza"
                img={images.pizza}
                ></MenuCategory>
                
                {/* Salad menu items */}
                <MenuCategory items={salad}
                title="salad"
                img={images.salad}
                ></MenuCategory>
                
                {/* Soup menu items */}
                <MenuCategory items={soup}
                title="soup"
                img={images.soup}
                ></MenuCategory>

            </div>
        </div>
    );
};

export default Menu;