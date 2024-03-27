import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AppHead from '../component/AppHead';
import Screen from '../component/Screen';
import tailwind from 'tailwind-react-native-classnames';
const CommandeScreen = () => {

    return (
        <Screen style={tailwind`flex-1 bg-white`}>
          <View style={styles.container}>
            <AppHead title={`Commande`} />
            <View style={styles.content}>
              <TouchableOpacity style={styles.button1}>
                <Text style={styles.buttonText}>autre</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Screen>
      );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 22,
    },
    content1: {
      marginTop: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    button: {
      backgroundColor: '#FF3C6E',
      padding: 10,
      borderRadius: 5,
      width: '100%',
      alignItems: 'center',
    },
    button1: {
      backgroundColor: '#FF3C6E',
      padding: 10,
      borderRadius: 5,
      marginTop:5,
      width: '100%',
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    qrCodeContainer: {
      alignItems: 'center',
      marginTop: 20,
    },
    qrCodeText: {
      marginTop: 10,
    },
  });
  
export default CommandeScreen;
