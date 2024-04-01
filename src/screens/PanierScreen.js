import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text, Modal } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Screen from '../component/Screen';
import tailwind from 'tailwind-react-native-classnames';
import AppHead from '../component/AppHead';
import AppButton from '../component/AppButton';
import colors from '../component/configs/colors';
import CartItems from '../component/CartItems';
import { CartContext } from '../hooks/cartContext';
import { useNavigation } from '@react-navigation/core';
import ViewCart from '../component/ViewCart';


const CartScreen = ({ route }) => {

    const { total = 0 } = route.params || {};
    const [modalVisible, setModalVisible] = useState(false);
    const [cartTotal, setCartTotal] = useState(total);
    const [count, setCount] = useState(0);
    const { cartItems, setCartItems } = useContext(CartContext);
    const navigation = useNavigation();

       const addOrder = () => {
        setModalVisible(false);
        navigation.navigate("CheckoutScreen", { total: cartTotal, count: count });
    };

    useEffect(() => {
        const newTotal = cartItems.reduce((acc, item) => {
            return acc + item.foods.reduce((foodAcc, food) => foodAcc + (food.price || 0), 0);
        }, 0);
        setCartTotal(newTotal);
        updateCount();
    }, [cartItems]);

    const updateCount = () => {
        const totalCount = cartItems.reduce((acc, item) => acc + item.foods.length, 0);
        setCount(totalCount);
    };

    const handleRemove = (id, resName, resImage) => {
        const updatedCartItems = cartItems.map(item => {
            if (item.resName === resName) {
                const updatedFoods = item.foods.filter(food => food.id !== id);
                if (updatedFoods.length > 0) {
                    return { ...item, foods: updatedFoods };
                } else {
                    return null;
                }
            }
            return item;
        }).filter(Boolean); 
    
        if (updatedCartItems.length === 0) {
            setCartItems([]);
        } else {
            setCartItems(updatedCartItems);
        }
    };


    return (
        <Screen style={tailwind`flex-1 bg-white`}>
            <AppHead title={`Votre Panier (${count})`} icon="basket-outline" />
            <View style={tailwind`flex-1`}>
                <CartItems cartItems={cartItems} handleRemove={handleRemove} updateCount={updateCount} />
            </View>
            {count > 0 && (
                <View style={tailwind`flex-row justify-between items-center px-5 pb-5`}>
                    <View style={styles.totalContainer}>
                        <Text style={styles.total}>Total</Text>
                        <Text style={styles.totalAmount}>{cartTotal}€</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <AppButton title="Payer" onPress={addOrder} color="black" />
                    </View>
                </View>
            )}
        </Screen>
    );
}


const styles = StyleSheet.create({
    totalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonContainer: {
        marginLeft: 20,
        width: 150
    },
    total: {
        fontSize: 20,
        color: colors.title,
        marginRight: 10,
    },
    totalAmount: {
        fontSize: 23,
    },
});

export default CartScreen;