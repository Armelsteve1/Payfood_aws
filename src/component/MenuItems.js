import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import tailwind from 'tailwind-react-native-classnames';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import colors from '../component/configs/colors';

const MenuItems = ({ resName, resImage, id, menu_id, handleTotalPrice, handleTotalItems }) => {
    const [foods, setFoods] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    console.log('Cart Items:', cartItems);
    useEffect(() => {
        fetch(`https://qxqiytxy36.execute-api.eu-north-1.amazonaws.com/items/${id}/${menu_id}`)
            .then(response => response.json())
            .then(data => setFoods(data.items))
            .catch(error => console.error('Il y avait une erreur lors de la récupération des données de l\'API', error));
    }, []);

    const match = id => {
        const resIndex = cartItems.findIndex(item => item.resName === resName);
        if (resIndex >= 0) {
            const menuIndex = cartItems[resIndex].foods.findIndex(item => item.id === id);
            return menuIndex >= 0;
        }
        return false;
    };

    const handleAddRemove = (id) => {
        const indexFromFood = foods.findIndex(x => x.id === id);
        const resIndex = cartItems.findIndex(item => item.resName === resName);
        const foodItem = foods[indexFromFood];

        if (resIndex >= 0) {
            const menuIndex = cartItems[resIndex].foods.findIndex(item => item.id === id);
            if (menuIndex >= 0) {
                let oldArrays = [...cartItems];
                let oldfoods = [...oldArrays[resIndex].foods];
                oldfoods.splice(menuIndex, 1);
                oldArrays.splice(resIndex, 1);
                let newArray = [...oldArrays, { foods: oldfoods, resName, resImage }];
                setCartItems(newArray);
            } else {
                let oldArrays = [...cartItems];
                let newFoodArray = [...oldArrays[resIndex].foods, foodItem];
                oldArrays.splice(resIndex, 1);
                let updatedResArray = [...oldArrays, { foods: newFoodArray, resName, resImage }];
                setCartItems(updatedResArray);
            }
        } else {
            let oldArrays = [...cartItems];
            let newResFoodArray = [...oldArrays, {
                foods: [{ ...foodItem }],
                resName,
                resImage
            }];
            setCartItems(newResFoodArray);
        }
    }

    useEffect(() => {
        const newTotalPrice = cartItems.reduce((total, item) => total + item.foods.reduce((sum, food) => sum + food.price, 0), 0);
        const newAllItems = cartItems.reduce((total, item) => total + item.foods.length, 0);
    
        handleTotalPrice(newTotalPrice);
        handleTotalItems(newAllItems);
        console.log(newTotalPrice);
    }, [cartItems]);

    return (
        <View style={tailwind`mt-5 mb-12`}>
            {foods && foods.map(({ title, description, image, price, id }, index) => (
                <View style={tailwind`mb-3 flex-row justify-between items-center pb-3 border-b border-gray-100`} key={index}>
                    <View style={tailwind`flex-1 pr-3 flex-row items-center`}>
                        {match(id) ? (
                            <BouncyCheckbox fillColor={colors.black} isChecked={true} onPress={() => handleAddRemove(id)} />
                        ) : (
                            <BouncyCheckbox fillColor={colors.black} isChecked={false} onPress={() => handleAddRemove(id)} />
                        )}
                        <View style={tailwind`flex-1 pl-2`}>
                            <Text style={[tailwind`text-gray-900 font-bold mb-1`, { fontSize: 16 }]}>{title}</Text>
                            <Text style={tailwind`text-gray-800 text-xs`}>{price}€</Text>
                            <Text style={tailwind`text-gray-600 text-xs`}>{description}</Text>
                        </View>
                    </View>
                    <View style={tailwind``}>
                        <Image style={tailwind`h-16 w-16 rounded-lg`} source={{ uri: image }} />
                    </View>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({});

export default MenuItems;