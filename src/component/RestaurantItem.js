import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import tailwind from 'tailwind-react-native-classnames';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

const RestaurantItemCard = ({ item, onPress }) => {
    const [loved, setLoved] = useState(false);
    return (
        <TouchableOpacity style={tailwind`mx-4 mb-4`} onPress={onPress}>
            <Image
                source={{ uri: item.image_url }}
                style={tailwind`w-full h-48 rounded-lg`}
            />
            <TouchableOpacity style={tailwind`absolute top-2 right-2`} onPress={() => setLoved(e => !e)}>
                <Entypo name={`${loved ? 'heart' : 'heart-outlined'}`} size={28} color="#fff" />
            </TouchableOpacity>
            <View style={tailwind`flex-row items-center mt-1`}>
                <View style={tailwind`flex-grow`}>
                    <Text style={tailwind`font-bold text-lg`} numberOfLines={1}>{item.name}</Text>
                    <View style={tailwind`flex-row items-center`}>
                        <MaterialCommunityIcons name="clock-time-four" size={13} color="#FF3C6E" />
                        <Text style={tailwind`text-xs text-gray-700`}> 20-30 • min • {item.price}</Text>
                    </View>
                </View>
                <View style={tailwind`w-8 h-8 justify-center items-center bg-gray-100 rounded-full`}>
                    <Text style={tailwind`text-gray-600 text-xs`}>{item.rating}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const RestaurantItem = ({ restaurantData, searchQuery }) => {
    const [filteredData, setFilteredData] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const filtered = restaurantData.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(filtered);
    }, [restaurantData, searchQuery]);

    const handlePress = item => {
        navigation.navigate("DetailsScreen", {
            item: { ...item },
        });
    };

    return (
        <View style={tailwind`mt-8`}>
            {filteredData.map((item, index) => (
                <RestaurantItemCard key={index} item={item} onPress={() => handlePress(item)} />
            ))}
        </View>
    );
};

export default RestaurantItem;
