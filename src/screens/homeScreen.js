import React, {useState } from 'react';
import { ScrollView} from 'react-native';
import Screen from '../component/Screen'
import SearchBar from '../component/SearchBar'
import RestaurantItem from '../component/RestaurantItem'
import tailwind from 'tailwind-react-native-classnames';
import Categories from '../component/Categories';


const HomeScreen = () => {
    const [restaurantData,] = useState([])
    const [city, setCity] = useState("Paris")

    return (
        <Screen style={tailwind`bg-white flex-1`}>
            {/* <SearchBar setCity={setCity} city={city} /> */}
            <Categories/>
            <ScrollView style={tailwind`flex-1`} showsVerticalScrollIndicator={false}>
            <RestaurantItem restaurantData={restaurantData} />
            </ScrollView>
        </Screen>
    );
}

export default HomeScreen;