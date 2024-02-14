import React, { useState, useContext } from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import tailwind from 'tailwind-react-native-classnames';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import colors from '../component/configs/colors';
import { CartContext } from './MenuItems';

const CartItems = () => {
    const cartItemsValue = useContext(CartContext);
    const [cartItems, setCartItems] = useState(cartItemsValue);
    
    console.log('Cart Items:', cartItems);
    
    if (!Array.isArray(cartItems)) {
        console.error('cartItems is not an array:', cartItems);
        return null;
    }
    
    const match = (id, resName) => {
        return cartItems.some(item => item.resName === resName && item.foods.some(food => food.id === id));
    }

    const handleRemove = (id, resName, resImage) => {
        const updatedCartItems = cartItems.map(item => {
            if (item.resName === resName) {
                const updatedFoods = item.foods.filter(food => food.id !== id);
                if (updatedFoods.length > 0) {
                    return { ...item, foods: updatedFoods };
                }
            }
            return item;
        });
        setCartItems(updatedCartItems);
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
                                    onPress={() => handleRemove(food.id, item.resName, item.resImage)}
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

const styles = StyleSheet.create({})

export default CartItems;
