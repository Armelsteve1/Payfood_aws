import React, { useState, useEffect, useContext } from 'react';
import { View, Image, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import Screen from '../component/Screen';
import tailwind from 'tailwind-react-native-classnames';
import AppHead from '../component/AppHead';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Auth } from 'aws-amplify';
import { useNavigation } from '@react-navigation/native';
import colors from '../component/configs/colors';
import EditProfileScreen from './EditProfileScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../hooks/AuthContext';

const AccountScreen = () => {

  const navigation = useNavigation();
  const { signOut } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [isEditProfileModalVisible, setIsEditProfileModalVisible] = useState(false);
  const [isRestaurateur, setRestaurateur] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

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
    
        setUserDetails(await response.json());

        setUser(userData.attributes);
        
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
    

  const toggleEditProfileModal = () => {
    setIsEditProfileModalVisible(!isEditProfileModalVisible);
  };

    const handleRestaurant = async () => {
        navigation.navigate('HomeRest');
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

    const handleSignOut = async () => {
      try {
        await Auth.signOut();
        signOut();

        console.log('User signed out successfully.');
      } catch (error) {
        console.error('Error signing out:', error);
      }
    };
  
    const handleDelete = async () => {
      Alert.alert(
        'Attention',
        'Voulez-vous vraiment supprimer votre compte définitivement ?',
        [
          {
            text: 'Supprimer',
            onPress: async () => {
              try {
                await Auth.deleteUser(user);
                signOut();
                console.log('Delete pressed, account deleted successfully');
              } catch (error) {
                console.log('Error while deleting account', error);
              }
            },
          },
          {
            text: 'Annuler',
            onPress: () => console.log('Cancel pressed'),
            style: 'cancel',
          },
        ]
      );
    };
    

  return (
    <Screen style={tailwind`flex-1 bg-white`}>
      <AppHead title={`Mon compte`} icon="person-outline" />
      <View style={tailwind`justify-center items-center`}>
        <View style={tailwind`rounded-full overflow-hidden w-40 h-40 mt-2`}>
          <Image source={require('../assets/images/avatar.gif')} style={tailwind`w-40 h-40`} />
        </View>
        <View style={tailwind`mt-4 flex-row items-center`}>
          <Text style={tailwind`text-3xl font-bold`}>{userDetails[0]?.username}</Text>
          <TouchableOpacity onPress={toggleEditProfileModal} style={{ marginLeft: 10 }}>
            <Ionicons name="create-outline" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
        <Text style={tailwind`text-lg text-gray-600`}>{userDetails[0]?.email}</Text>
      </View>
      <ScrollView style={tailwind`flex-1`} showsVerticalScrollIndicator={true}>
        <View style={tailwind`mx-4 border-t border-t-2 mt-5 border-gray-100`}>
          <Text style={tailwind`text-gray-800 mt-2 text-lg mb-2`}>Favoris</Text>
          {[
            { title: 'Accueil', text: 'Aller à l\'accueil', Icon: () => <AntDesign name="home" size={24} color={colors.primary} />, onPress: () => navigation.navigate('Accueil') },
            { title: 'Mon porte monnaie', text: 'Voir méthodes de paiement disponibles', Icon: () => <Ionicons name="wallet" size={24} color={colors.primary} />, onPress: () => navigation.navigate('Portefeuille') },
            { title: 'Mes préférences', text: 'Gérer les paramètres de mon compte', Icon: () => <Ionicons name="build" size={24} color={colors.primary} />, onPress: () => navigation.navigate('Preferences') },
          ].map((item, index) => (
            <SavedPlaces key={index} {...item} />
          ))}
        </View>
        <View style={tailwind`mx-4 border-t border-t-2 mt-5 border-gray-100`}>
            <Text style={tailwind`text-gray-800 mt-2 text-lg`}>Autres options</Text>
            <TouchableOpacity onPress={handleResetPassword}>
                <Text style={{ ...tailwind`text-gray-900 mt-2`, color: colors.gray }}>Réinitialiser mon mot de passe</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSignOut}>
                <Text style={{ ...tailwind`text-gray-900 mt-2`, color: colors.gray }} onPress={handleSignOut}>Se déconnecter</Text>
            </TouchableOpacity>
            {isRestaurateur && (
                <TouchableOpacity onPress={handleRestaurant}>
                    <Text style={{ ...tailwind`text-gray-900 mt-2`, color: colors.gray }}>Restaurateur</Text>
                </TouchableOpacity>
            )}
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
          <EditProfileScreen
            userDetails={userDetails}
            onClose={toggleEditProfileModal}
          />
        </View>
      </Modal>
    </Screen>
  );
}

const SavedPlaces = ({ title, text, Icon, onPress }) => (
  <TouchableOpacity
    style={tailwind`flex-row items-center my-3`}
    onPress={onPress}
  >
    <Icon />
    <View style={tailwind`ml-5`}>
      <Text style={tailwind`text-gray-800`}>{title}</Text>
      <Text style={tailwind`text-gray-600 text-xs mt-1`}>{text}</Text>
    </View>
  </TouchableOpacity>
);

export default AccountScreen;
