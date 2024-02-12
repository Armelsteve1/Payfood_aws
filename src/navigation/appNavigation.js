import React, { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import { Auth } from 'aws-amplify';
import HomeNavigator from './HomeNavigator';
import { LogBox } from 'react-native';
import { ActivityIndicator, View } from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']);

export const AuthContext = React.createContext();

export default function AppNavigator() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkUser();
    }, [])

    async function checkUser() {
        try {
            const userData = await Auth.currentAuthenticatedUser();
            setUser(userData.attributes);
        } catch (error) {
            console.log('user is not signed in');
            setUser(null);
        }
        setLoading(false);
    }

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            <NavigationContainer>
                {user ? (
                    <HomeNavigator />
                ) : (
                    <AuthNavigator />
                )}
            </NavigationContainer>
        </AuthContext.Provider>
    )
}
