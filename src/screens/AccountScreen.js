import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import Screen from '../component/Screen'
import tailwind from 'tailwind-react-native-classnames';
import AppHead from '../component/AppHead';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Auth } from 'aws-amplify';
import { useNavigation } from '@react-navigation/native';
import colors from '../component/configs/colors';

const AccountScreen = () => {
    const navigation = useNavigation();
    const [user, setUser] = useState(null);
    const [isEditProfileModalVisible, setIsEditProfileModalVisible] = useState(false);

    useEffect(() => {
        checkUser();
    }, []);

    async function checkUser() {
        try {
            const userData = await Auth.currentAuthenticatedUser();
            setUser(userData.attributes);
            console.log(userData.attributes, 'user');
        } catch (error) {
            console.log('user is not signed in');
        }
    }

    const toggleEditProfileModal = () => {
        setIsEditProfileModalVisible(!isEditProfileModalVisible);
    };

    const handleSignOut = async () => {
        navigation.navigate('QrCode');
    };

    const handleResetPassword = async () => {
        try {
            await Auth.forgotPassword(user.email);
            Alert.alert('Succès', 'Un e-mail de réinitialisation du mot de passe a été envoyé.');
            console.log("reset pwd email sent")
        } catch (error) {
            console.error('Password reset error:', error);
        }
    };

    const handleDelete = async () => {
        Alert.alert('Attention', 'Voulez-vous vraiment supprimer votre compte définitivement ?', [
            {
                text: 'Supprimer',
                onPress: async () => {
                    try {
                        await Auth.deleteUser(user);
                        console.log('delete pressed and account deleted successfully')
                    } catch (error) {
                        console.log('error while deleting account', error)
                    }
                }
            },
            {
                text: 'Annuler',
                onPress: () => console.log('cancel pressed'),
                style: 'cancel',
            },
        ]);
    };

    return (
        <Screen style={tailwind`flex-1 bg-white`}>
            <AppHead title={`Mon compte`} icon="settings-outline" />
            <View style={tailwind`justify-center items-center`}>
                <View style={tailwind`rounded-full overflow-hidden w-40 h-40 mt-2`}>
                    <Image source={require('../assets/images/avatar.gif')} style={tailwind`w-40 h-40`} />
                </View>
                <View style={tailwind`mt-4 flex-row items-center`}>
                    <Text style={tailwind`text-3xl font-bold`}>{user?.displayName}</Text>
                    <TouchableOpacity onPress={toggleEditProfileModal} style={{ marginLeft: 10, textDecorationLine: 'none' }}>
                        <Text style={{ textDecorationLine: 'none' }}>
                            <AntDesign name="edit" size={24} color={colors.primary} />
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text style={tailwind`text-lg text-gray-600`}>{user?.email}</Text>
            </View>
            <ScrollView style={tailwind`flex-1`} showsVerticalScrollIndicator={true}>
                <View style={tailwind`mx-4 border-t border-t-2 mt-5 border-gray-100`}>
                    <Text style={tailwind`text-gray-800 mt-2 text-lg mb-2`}>Favoris</Text>
                    {/* SavedPlaces components... */}
                </View>
                <View style={tailwind`mx-4 border-t border-t-2 mt-5 border-gray-100`}>
                    <Text style={tailwind`text-gray-800 mt-2 text-lg`}>Autres options</Text>
                    <TouchableOpacity onPress={handleResetPassword}>
                        <Text style={{ ...tailwind`text-gray-900 mt-2`, color: colors.gray }}>Réinitialiser mon mot de passe</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSignOut}>
                        <Text style={{ ...tailwind`text-gray-900 mt-2`, color: colors.gray }}>Se déconnecter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSignOut}>
                        <Text style={{ ...tailwind`text-gray-900 mt-2`, color: colors.gray }}>Restaurateur</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleDelete}>
                        <Text style={{ ...tailwind`text-gray-900 mt-2`, color: colors.denger }}>Supprimer mon compte</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Modal
                isVisible={isEditProfileModalVisible}
                onBackdropPress={toggleEditProfileModal}
                backdropOpacity={0.7}
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <View style={{
                    width: 280,
                    height: 300,
                    backgroundColor: 'white',
                }}>
                    {/* EditProfileScreen component... */}
                </View>
            </Modal>
        </Screen>
    );
}

export default AccountScreen;
