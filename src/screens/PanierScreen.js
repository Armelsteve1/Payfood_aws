import React, { useState } from 'react';
import { View, StyleSheet, Text, Modal } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Screen from '../component/Screen';
import tailwind from 'tailwind-react-native-classnames';
import AppHead from '../component/AppHead';
import AppButton from '../component/AppButton';
import colors from '../component/configs/colors';
import CartItems from '../component/CartItems';
import { useNavigation } from '@react-navigation/core';


const CartScreen = ({ route }) => {
    const { total = 0, count = 0 } = route.params || {};
    const [modalVisible, setModalVisible] = useState(false);

    const navigation = useNavigation();

    const addOrder = () => {
        setModalVisible(false);
        totalPrice = total;
        navigation.navigate("CheckoutScreen");
    };

    return (
        <Screen style={tailwind`flex-1 bg-white`}>
            <AppHead title={`Votre Panier (${count})`} icon="basket-outline" />
            <View style={tailwind`flex-1`}>
                <CartItems />
            </View>
            {!!count > 0 && (
                <View style={tailwind`flex-row justify-between items-center px-5 pb-5`}>
                    <View style={styles.totalContainer}>
                        <Text style={styles.total}>Total</Text>
                        <Text style={styles.totalAmount}>{total}€</Text>
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