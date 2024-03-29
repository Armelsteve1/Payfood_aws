import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DetailsScreen from '../screens/DetailsScreen';
import SuccessScreen from '../screens/SuccessScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import MainTabNavigator from './MainTabNavigator';
import EditProfileScreen from '../screens/EditProfileScreen';
import AccountSettingsScreen from '../screens/AccountSettingsScreen';
import QRCodeGenerator from '../screens/RestaurateurScreen'
import AuthNavigator from './AuthNavigator';
import CommandeScreen from '../screens/CommandeScreen'
const Stack = createStackNavigator();

export default function HomeNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Main" component={MainTabNavigator} />
            <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
            <Stack.Screen name="Auth" component={AuthNavigator} />
            <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
            <Stack.Screen name='QrCode' component={QRCodeGenerator}/>
            <Stack.Screen name='Commande' component={CommandeScreen}/>
            <Stack.Screen name='SuccessScreen' component={SuccessScreen}/>
            <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
            <Stack.Screen name="Preferences" component={AccountSettingsScreen} />
        </Stack.Navigator>
    )
}