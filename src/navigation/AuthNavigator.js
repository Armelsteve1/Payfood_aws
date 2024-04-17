import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import JoinScreen from '../screens/JoinScreen'
import SigninScreen from '../screens/login';
import SignupScreen from '../screens/signUp';
import ConfirmationScreen from '../screens/ConfirmationScreen';
import SuccessSignUpScreen from '../screens/SuccessSignUpScreen';

const Stack = createStackNavigator();

export default function AuthNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="JoinScreen" component={JoinScreen} />
            <Stack.Screen name="SignIn" component={SigninScreen} />
            <Stack.Screen name="ConfirmationScreen" component={ConfirmationScreen} />
            <Stack.Screen name="SuccessSignUpScreen" component={SuccessSignUpScreen} />
            <Stack.Screen name="SignUp" component={SignupScreen} />
        </Stack.Navigator>
    )
}