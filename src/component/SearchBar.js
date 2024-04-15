import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import tailwind from 'tailwind-react-native-classnames';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SearchBar = ({ setSearchQuery }) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        setSearchQuery(query);
    };

    return (
        <View style={tailwind`flex-row mt-3 px-4 pb-3 border-b border-gray-100 border-b-2`}>
            <View style={tailwind`flex-1 ml-3`}>
                <View style={tailwind`flex-row items-center bg-gray-200 mt-4 rounded-full px-6`}>
                    <MaterialCommunityIcons name="magnify" size={30} color="#6B7280" />
                    <TextInput
                        style={[tailwind`flex-1 ml-2`, { height: 40, fontSize: 15 }]}
                        placeholder="Recherchez un nom de restaurant"
                        returnKeyType="search"
                        value={query}
                        onChangeText={text => setQuery(text)}
                        onSubmitEditing={handleSearch}
                    />
                </View>
            </View>
        </View>
    );
};

export default SearchBar;
