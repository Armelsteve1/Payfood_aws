import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import colors from '../component/configs/colors';
import HomeScreen from '../screens/homeScreen'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import CartScreen from '../screens/PanierScreen';
import WalletScreen from '../screens/WalletScreen';
import AccountScreen from '../screens/AccountScreen';
import ScanScreen from '../screens/ScanScreen';
import RestaurateurScreen from '../screens/QRCodeGeneretScreen'


const Tab = createBottomTabNavigator()

const RestaurateurNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: colors.activeTintColor,
                tabBarInactiveTintColor: colors.inActiveTintColor,
                headerShown: false,
                tabBarStyle: {
                    borderTopWidth: 0,
                    paddingTop: 15,
                    paddingBottom: 30,
                    height: 80,
                },
            }}
        >
            <Tab.Screen name="HomeRestaurateur" component={RestaurateurScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="home" color={color} size={size} />
                    )
                }}
            />
            {/* <Tab.Screen name="Parcourir" component={BrowseScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="md-search-sharp" color={color} size={size} />
                    )
                }}
            /> */}
            <Tab.Screen name="Panier" component={CartScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                    <Ionicons name="basket-outline" color={color} size={size} />                    )
                }}
            />
            <Tab.Screen name="Scan" component={ScanScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="qr-code-outline" color={color} size={size} />
                    )
                }}
            />
            <Tab.Screen name="Portefeuille" component={WalletScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="card-outline" color={color} size={size} />
                    )
                }}
            />
            <Tab.Screen name="Compte" component={AccountScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-outline" color={color} size={size} />
                    )
                }}
            />
        </Tab.Navigator >
    );
}


export default RestaurateurNavigation;
