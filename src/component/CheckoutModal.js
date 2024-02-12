import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Modal } from 'react-native';
import tailwind from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/core';

const CheckoutModal = ({ setModalVisible, total, allCartItems }) => {
    const navigation = useNavigation();

    const addOrder = () => {
        setModalVisible(false);
        totalPrice= total
        navigation.navigate("CheckoutScreen");
    };

    return (
        <View style={tailwind`flex-1 bg-black bg-opacity-40`}>
            <TouchableOpacity style={tailwind`flex-grow`} onPress={() => setModalVisible(false)}>
            </TouchableOpacity>
            <View style={tailwind`pb-5  w-full px-4 bg-white pt-4`}>
                <Text style={tailwind`text-black text-center text-xl font-bold mb-5`}>Détails des prix</Text>
                <View style={tailwind`mb-5`}>
                    {allCartItems?.map(item => (
                        <OrderItem
                            key={item.resName}
                            name={item.resName}
                            value={`€${item?.foods.reduce((total, item) => total + item.price, 0).toFixed(1)} • (${item?.foods?.length})`}
                        />
                    ))}
                    <OrderItem name="Total price" value={`€${total}`} total />
                </View>
                <TouchableOpacity
                    style={[tailwind`py-3 px-10 self-center rounded-full`, { backgroundColor: "#FF3C6E" }]}
                    onPress={addOrder}
                >
                    <Text style={tailwind`text-white`}>Payer</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CheckoutModal;

const OrderItem = ({ name, value, total }) => (
    <View style={tailwind`flex-row justify-between py-3 border-gray-200 items-center ${total ? 'border-t' : 'border-b'}`}>
        <Text style={tailwind`text-black font-bold text-black ${total && 'text-lg'}`} numberOfLines={1}>{name}</Text>
        <Text style={tailwind`text-black text-xs ${total && 'font-bold'}`}>{value}</Text>
    </View>
);
