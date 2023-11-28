import { useState } from "react";
import { images } from "../../Constant";
import Cover from "../Shared/Cover/Cover";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from "../../Hooks/useMenu";
import FoodCard from "../../Components/FoodCard/FoodCard";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const OrderFood = () => {
    const categories = ['dessert', 'pizza', 'salad', 'soup', 'drinks'];
    const category = useParams();
    const initialIndex = categories.indexOf(category)
    const [tabIndex, setTabIndex] = useState(initialIndex)
    const [menu] = useMenu();
    const desserts = menu.filter(item => item.category === 'dessert');
    const pizzas = menu.filter(item => item.category === 'pizza');
    const salads = menu.filter(item => item.category === 'salad');
    const soups = menu.filter(item => item.category === 'soup');
    const drinks = menu.filter(item => item.category === 'drinks');
    return (
        <div className="mb-12">  
            <Helmet>
                <title>Bistro Boss | Order Food</title>
            </Helmet>
            <Cover
                img={images.orderFoodBanner}
                title="Order Food"
                details="Would you like to try a dish?"
            />
            <div className="px-12">
                <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList>
                        <Tab>Desserts</Tab>
                        <Tab>Pizzas</Tab>
                        <Tab>Salads</Tab>
                        <Tab>Soups</Tab>
                        <Tab>Drinks</Tab>
                    </TabList>

                    <TabPanel>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {
                                desserts.map(dessert => <FoodCard key={dessert._id} items={dessert}></FoodCard>)
                            }
                        </div>
                    </TabPanel>

                    <TabPanel>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {
                                pizzas.map(pizza => <FoodCard key={pizza._id} items={pizza}></FoodCard>)
                            }
                        </div>
                    </TabPanel>

                    <TabPanel>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {
                                salads.map(salad => <FoodCard key={salad._id} items={salad}></FoodCard>)
                            }
                        </div>
                    </TabPanel>

                    <TabPanel>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {
                                soups.map(soup => <FoodCard key={soup._id} items={soup}></FoodCard>)
                            }
                        </div>
                    </TabPanel>

                    <TabPanel>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {
                                drinks.map(drink => <FoodCard key={drink._id} items={drink}></FoodCard>)
                            }
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default OrderFood;