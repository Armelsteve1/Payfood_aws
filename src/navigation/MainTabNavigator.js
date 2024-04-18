import React, { useState, useEffect, useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../component/configs/colors';
import HomeScreen from '../screens/homeScreen';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import CartScreen from '../screens/PanierScreen';
import WalletScreen from '../screens/WalletScreen';
import AccountScreen from '../screens/AccountScreen';
import RestaurantScreen from '../screens/RestaurantScreen';
import CommandeRestaurant from '../screens/CommandeRestaurant';
import ScanScreen from '../screens/ScanScreen';
import QRCodeGenertScreen from '../screens/QRCodeGeneretScreen';
import AuthContext from '../hooks/AuthContext';
import { Auth } from 'aws-amplify';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
    const { signOut } = useContext(AuthContext);
    const [isRestaurateur, setRestaurateur] = useState(null);

    useEffect(() => {
        checkUser();
    }, []);

    async function checkUser() {
        try {
            const userData = await Auth.currentAuthenticatedUser();
            const userEmail = userData.attributes.email;

            const response = await fetch(`https://kkwnqgn1pb.execute-api.eu-north-1.amazonaws.com/user/${userEmail}`);
            if (!response.ok) {
                throw new Error('Failed to retrieve user data');
            }
            const userDetails = await response.json();
            const groups = userData.signInUserSession.accessToken.payload['cognito:groups'];
            if (groups && groups.includes('Restaurateur')) {
                setRestaurateur(true);
            } else {
                setRestaurateur(false);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    }

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: colors.activeTintColor,
                tabBarInactiveTintColor: colors.inActiveTintColor,
                headerShown: false,
                tabBarStyle: {
                    borderTopWidth: 0,
                    paddingTop: 16,
                    paddingBottom: 20,
                    height: 80,
                },
            }}
        >
            {isRestaurateur ? (
                <>
                    <Tab.Screen
                        name="Restaurant"
                        component={RestaurantScreen}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="business-outline" color={color} size={size} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Menu"
                        component={RestaurantScreen}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="fast-food-outline" color={color} size={size} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Qr code"
                        component={QRCodeGenertScreen}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="qr-code-outline" color={color} size={size} />
                            )
                        }}
                    />
                    <Tab.Screen
                        name="Commandes"
                        component={CommandeRestaurant}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="receipt-outline" color={color} size={size} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Compte"
                        component={AccountScreen}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="person-outline" color={color} size={size} />
                            ),
                        }}
                    />
                </>
            ) : (
                <>
                    <Tab.Screen
                        name="Accueil"
                        component={HomeScreen}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <AntDesign name="home" color={color} size={size} />
                            )
                        }}
                    />
                    <Tab.Screen
                        name="Panier"
                        component={CartScreen}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="basket-outline" color={color} size={size} />
                            )
                        }}
                    />
                    <Tab.Screen
                        name="Scan"
                        component={ScanScreen}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="qr-code-outline" color={color} size={size} />
                            )
                        }}
                    />
                    <Tab.Screen
                        name="Portefeuille"
                        component={WalletScreen}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="card-outline" color={color} size={size} />
                            )
                        }}
                    />
                    <Tab.Screen
                        name="Compte"
                        component={AccountScreen}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="person-outline" color={color} size={size} />
                            )
                        }}
                    />
                </>
            )}
        </Tab.Navigator>
    );
};

export default MainTabNavigator;
