import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import colors from '../component/configs/colors';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import CreatedRestaurant from '../screens/AccountRestaurantScreen';
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
            <Tab.Screen name="Home" component={RestaurateurScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="home" color={color} size={size} />
                    )
                }}
            />
            <Tab.Screen name="Restaurant" component={CreatedRestaurant}
                options={{
                    tabBarIcon: ({ color, size }) => (
                    <Ionicons name="settings-outline" color={color} size={size} />                    )
                }}
            />
        </Tab.Navigator >
    );
}


export default RestaurateurNavigation;
