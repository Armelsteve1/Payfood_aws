import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Screen from '../component/Screen';
import tailwind from 'tailwind-react-native-classnames';
import colors from '../component/configs/colors.js';
// import { getFirestore, collection, doc, setDoc, updateDoc, getDoc } from "firebase/firestore";


export default function EditProfileScreen({ navigation }) {
    // const auth = getAuth();
    // const firestore = getFirestore(app);

    // const user = auth.currentUser;

    // const usersRef = collection(firestore, "users");
    // const userDoc = doc(usersRef, auth.currentUser.uid);

    const [newName, setNewName] = useState();
    const [newPhoneNumber, setNewPhoneNumber] = useState('');
    const [newEmail, setNewEmail] = useState();

    // const getUserData = async () => {
    //     try {
    //         const userDocSnapshot = await getDoc(userDoc);

    //         if (userDocSnapshot.exists()) {
    //             const userPhoneNumber = userDocSnapshot.data().phoneNumber;
    //             setNewPhoneNumber(userPhoneNumber);
    //         } else {
    //             Alert.alert('Erreur', 'Le document utilisateur n\'existe pas.');
    //         }
    //     } catch (error) {
    //         console.error('Error fetching user data:', error.message);
    //         Alert.alert('Erreur', 'Une erreur s\'est produite lors de la récupération des données utilisateur.');
    //     }
    // };

    // useEffect(() => {
    //     getUserData();
    // }, []);

    const handleUpdateProfile = async () => {
        // try {
        //     await updateProfile(auth.currentUser, {
        //         displayName: newName,
        //         phoneNumber: newPhoneNumber,
        //     });

        //     if (newPhoneNumber !== user.phoneNumber && newPhoneNumber) {
        //         await updateDoc(userDoc, {
        //             phoneNumber: newPhoneNumber,
        //         });
        //     }

        //     if (newEmail !== user.email) {
        //         await updateEmail(auth.currentUser, newEmail);
        //     }

        //     Alert.alert('Succès', 'Mise à jour du profil réussie.');
        // } catch (error) {
        //     Alert.alert('Erreur', error.message);
        // }
    };

    return (
        <Screen style={tailwind`flex-1 bg-white`}>
            <View style={tailwind`flex-1 p-4`}>
                <View style={tailwind`flex-1`}>
                    <Text style={tailwind`text-2xl font-bold`}>Modification des informations</Text>
                    <TextInput
                        style={tailwind`border border-gray-300 rounded-md p-2 mt-4`}
                        placeholder="Nom et prénom"
                        placeholderTextColor="grey"
                        value={newName}
                        onChangeText={(text) => setNewName(text)}
                    />
                    <TextInput
                        style={tailwind`border border-gray-300 rounded-md p-2 mt-2`}
                        placeholder="Numéro de téléphone"
                        placeholderTextColor="grey"
                        value={newPhoneNumber}
                        keyboardType={'phone-pad'}
                        onChangeText={(number) => setNewPhoneNumber(number)}
                    />
                    <TextInput
                        style={tailwind`border border-gray-300 rounded-md p-2 mt-2`}
                        placeholder="Adresse email"
                        placeholderTextColor="grey"
                        value={newEmail}
                        onChangeText={(email) => setNewEmail(email)}
                    />
                </View>
                <View style={{ justifyContent: 'flex-end', flex: 1 }}>
                    <TouchableOpacity
                        style={{ backgroundColor: colors.primary, padding: 10, borderRadius: 5, marginTop: 4 }}
                        onPress={handleUpdateProfile}
                    >
                        <Text style={tailwind`text-white text-center`}>Sauvegarder le profil</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Screen>
    );
}