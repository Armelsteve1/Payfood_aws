import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import { Auth } from 'aws-amplify';
import HomeNavigator from './HomeNavigator';
import { LogBox } from 'react-native';
import { ActivityIndicator, View } from 'react-native';
import AuthContext from '../hooks/AuthContext'; 

LogBox.ignoreLogs(['new NativeEventEmitter']);

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
            console.log(userData.attributes,'user')
        } catch (error) {
            console.log('user is not signed in');
            setUser(null);
        }
        setLoading(false);
    }

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#FF3C6E" />
            </View>
        );
    }

    return (
        <AuthContext.Provider value={{ 
            isSignedIn: !!user, 
            signIn: async (username, password) => {
                try {
                    const userData = await Auth.signIn(username, password);
                    console.log(user,'utilisateur')
                    setUser(userData.attributes);
                } catch (error) {
                    console.error('Error signing in:', error);
                }
            },
            signOut: async () => {
                try {
                    await Auth.signOut();
                    setUser(null);
                } catch (error) {
                    console.error('Error signing out:', error);
                }
            },
        }}>
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