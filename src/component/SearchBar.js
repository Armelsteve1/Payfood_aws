import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import tailwind from 'tailwind-react-native-classnames';
// import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SearchBar = ({ setCity, city }) => {
    const [searchQuery, setSearchQuery] = useState(city || "Paris");

    const handleSearch = (query) => {
        setSearchQuery(query);
        setCity(query);
    };

    return (
        <View style={tailwind`flex-row mt-3 px-4 pb-3 border-b border-gray-100 border-b-2`}>
            <View style={tailwind`self-center ml-3`}>
                {/* <Ionicons name="ios-location-sharp" size={24} color="#FF3C6E" /> */}
            </View>
            <TextInput
                style={tailwind`flex-1 bg-gray-200 mt-4 rounded-full px-4`}
                placeholder={searchQuery}
                onChangeText={handleSearch}
                returnKeyType={"search"}
            />
            <View style={tailwind`self-center ml-3 flex-row items-center bg-white py-2 px-3 rounded-full mr-3`}>
                <MaterialCommunityIcons name="clock-time-four" size={13} color="#FF3C6E" />
                <Text style={tailwind`ml-1`}>Recherche</Text>
            </View>
        </View>
    );
}
export default SearchBar;