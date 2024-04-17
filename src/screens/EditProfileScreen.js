import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Screen from '../component/Screen';
import tailwind from 'tailwind-react-native-classnames';
import colors from '../component/configs/colors.js';

export default function EditProfileScreen({ navigation, userDetails }) {

    const [newName, setNewName] = useState(userDetails ? userDetails[0].username : '');
    const [newPhoneNumber, setNewPhoneNumber] = useState(userDetails ? userDetails[0].phone : '');
    const [newEmail, setNewEmail] = useState(userDetails ? userDetails[0].email : '');

    const handleUpdateProfile = async () => {
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
                        style={[
                            tailwind`border border-gray-300 rounded-md p-2 mt-2`,
                            { color: 'gray', backgroundColor: '#f0f0f0' }
                        ]}
                        placeholder="Adresse email"
                        placeholderTextColor="grey"
                        value={newEmail}
                        editable={false}
                        pointerEvents="none"
                    />
                    <TextInput
                        style={tailwind`border border-gray-300 rounded-md p-2 mt-2`}
                        placeholder="Numéro de téléphone"
                        placeholderTextColor="grey"
                        value={newPhoneNumber}
                        keyboardType={'phone-pad'}
                        onChangeText={(number) => setNewPhoneNumber(number)}
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