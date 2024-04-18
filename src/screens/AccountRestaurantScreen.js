import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Screen from '../component/Screen';
import tailwind from 'tailwind-react-native-classnames';
import AppHead from '../component/AppHead';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import colors from '../component/configs/colors';
import { useNavigation } from '@react-navigation/native';

const AcountRestaurateur = () => {
  const navigation = useNavigation();
  return (
    <Screen style={tailwind`flex-1 bg-white`}>
      <AppHead title={`Mon Restaurant`} icon="person-outline" />
      <View style={tailwind`justify-center items-center`}>
        <View style={tailwind`rounded-full overflow-hidden w-40 h-40 mt-2`}>
          <Image source={require('../assets/images/avatar.gif')} style={tailwind`w-40 h-40`} />
        </View>
      </View>
      <ScrollView style={tailwind`flex-1`} showsVerticalScrollIndicator={true}>
        <View style={tailwind`mx-4 border-t border-t-2 mt-5 border-gray-100`}>
        {[
            { title: 'Mon restaurant', text: 'Gérer mon restaurant', Icon: () => <AntDesign name="setting" size={24} color={colors.primary} />, onPress: () => navigation.navigate('MonRest') },
            { title: 'Mes commandes', text: 'Gérer vos commandes', Icon: () => <Ionicons name="receipt-outline" size={24} color={colors.primary} />, onPress: () => navigation.navigate('CommandeRestaurant') },
            { title: 'Mon menu', text: 'Gérer mon menu', Icon: () => <Ionicons name="menu-outline" size={24} color={colors.primary} />, onPress: () => navigation.navigate('Preferences') },
        ].map((item, index) => (
            <SavedPlaces key={index} {...item} />
          ))}
        </View>
      </ScrollView>
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

export default AcountRestaurateur;
