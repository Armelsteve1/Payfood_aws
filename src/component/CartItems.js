import React, { useContext } from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import tailwind from 'tailwind-react-native-classnames';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import colors from '../component/configs/colors';
import { CartContext } from '../hooks/cartContext';

const CartItems = ({ handleRemove, updateCount }) => {
    const { cartItems, setCartItems } = useContext(CartContext);

    const match = (id, resName) => {
        return cartItems.some(item => item.resName === resName && item.foods.some(food => food.id === id));
    }

    const removeFromCartAndUpdateCount = (id, resName, resImage) => {
        handleRemove(id, resName, resImage);
        updateCount();
    }

    return (
        <ScrollView style={tailwind`mx-4 mt-3`} showsVerticalScrollIndicator={false}>
            {!cartItems.length && <Text style={tailwind`text-center text-black`}>Pas d'articles dans le panier !</Text>}
            {cartItems.map(item => (
                <View key={item.resName} style={tailwind`mb-4`}>
                    <View style={tailwind`mb-4 relative justify-center`}>
                        <Image style={tailwind`w-full h-16 rounded-lg`} source={{ uri: item.resImage }} />
                        <View style={[tailwind`absolute top-0 left-0 w-full h-full bg-black rounded-lg`, { opacity: 0.5 }]} />
                        <Text style={tailwind`absolute self-center text-white w-3/4 text-center font-bold text-xl`} numberOfLines={1}>{item.resName}</Text>
                    </View>
                    {item.foods.map((food) => (
                        <View style={tailwind`mb-3 flex-row justify-between items-center pb-3 border-b border-gray-100`} key={food.id}>
                            <View style={tailwind`flex-1 pr-3 flex-row items-center`}>
                                <BouncyCheckbox
                                    fillColor={colors.black}
                                    isChecked={match(food.id, item.resName)}
                                    onPress={() => removeFromCartAndUpdateCount(food.id, item.resName, item.resImage)}
                                />
                                <View style={tailwind`flex-1 pl-2`}>
                                    <Text style={[tailwind`text-gray-900 font-bold mb-1`, { fontSize: 16 }]}>{food.title}</Text>
                                    <Text style={tailwind`text-gray-800 text-xs`}>€{food.price}</Text>
                                    <Text style={tailwind`text-gray-600 text-xs`}>{food.description}</Text>
                                </View>
                            </View>
                            <View>
                                <Image style={tailwind`h-16 w-16 rounded-lg`} source={{ uri: food.image }} />
                            </View>
                        </View>
                    ))}
                </View>
            ))}
        </ScrollView>
    );
}

export default CartItems;
