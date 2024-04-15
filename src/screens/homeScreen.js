import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';
import Screen from '../component/Screen';
import SearchBar from '../component/SearchBar';
import RestaurantItem from '../component/RestaurantItem';
import tailwind from 'tailwind-react-native-classnames';

const HomeScreen = () => {
    const [restaurantData, setRestaurantData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [city, setCity] = useState("Paris");

    //fetch restaurants data
    useEffect(() => {
        fetch('https://arf3k5x9o1.execute-api.eu-north-1.amazonaws.com/items')
            .then(response => response.json())
            .then(data => setRestaurantData(data))
            .catch((error) => {
                console.error('Erreur:', error);
            });
    }, []);

    return (
        <Screen style={tailwind`bg-white flex-1`}>
            <Image style={styles.logo} source={require('../assets/logo.png')} />
            <SearchBar setSearchQuery={setSearchQuery} />
            <ScrollView style={tailwind`flex-1`} showsVerticalScrollIndicator={false}>
                <RestaurantItem restaurantData={restaurantData} searchQuery={searchQuery} />
            </ScrollView>
        </Screen>
    );
};

const styles = StyleSheet.create({
    logo: {
        alignSelf: 'center',
        top: 10,
    },
});

export default HomeScreen;
