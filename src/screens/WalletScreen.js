import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, TextInput, Button } from "react-native";
import { Card } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { Picker } from '@react-native-picker/picker';
import AppHead from '../component/AppHead';
import Screen from '../component/Screen';
import tailwind from 'tailwind-react-native-classnames';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { faAppleAlt } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Alert, Platform, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function WalletScreen() {
  const [rechargeAmount, setRechargeAmount] = useState('0,00');
  const navigation = useNavigation();

  const handleRecharge = () => {
    if (Platform.OS === 'ios') {
      Alert.prompt('Rechargez vos food coins', 'Veuillez saisir le montant', (amount) => {
        if (!amount) {
          Alert.alert('Erreur', 'Veuillez saisir un montant.');
          return;
        }
  
        Alert.alert(
          'Félicitations !',
          `Vous n'êtez pas si loin ! Vous pouvez dans pas longtemps payer avec vos ${amount} coins. Procéder au paiement?`,
          [
            {
              text: 'Annuler',
              style: 'cancel',
            },
            {
              text: 'Payer',
              onPress: () => {
                console.log("Montant de recharge :", amount);
                setRechargeAmount(amount);
                navigation.navigate('CheckoutScreen');
              },
            },
          ],
        );
      });
    } else if (Platform.OS === 'android') {
      let textInput = '';
      Alert.alert(
        'Rechargez vos food coins',
        'Veuillez saisir le montant',
        [
          {
            text: 'Annuler',
            style: 'cancel',
          },
          {
            text: 'Payer',
            onPress: () => {
              if (!textInput || isNaN(Number(textInput))) {
                Alert.alert('Erreur', 'Veuillez saisir un montant valide.');
                return;
              }
              const amount = Number(textInput);
              console.log("Montant de recharge :", amount);
              setRechargeAmount(amount);
              navigation.navigate('CheckoutScreen');
            },
          },
        ],
        { 
          onDismiss: () => {
            if (!textInput || isNaN(Number(textInput))) {
              Alert.alert('Erreur', 'Veuillez saisir un montant valide.');
              return;
            }
            const amount = Number(textInput);
            console.log("Montant de recharge :", amount);
            setRechargeAmount(amount);
            navigation.navigate('CheckoutScreen');
          },
          cancelable: true,
          cancelText: 'Annuler',
          keyboardType: 'numeric',
          content: (
            <TextInput
              onChangeText={(value) => (textInput = value)}
              keyboardType="numeric"
              autoFocus
            />
          ),
        }
      );
    }
  };
  
  

  return (
    <Screen style={tailwind`flex-1 bg-white`}>
      <AppHead title={`Mon portefeuille`} icon="card-outline" />
      <View contentContainerStyle={styles.cardContainer}>
        <Card containerStyle={styles.card}>
          <View style={styles.coinContainer}>
        <Text style={styles.text1}>{rechargeAmount}</Text>
            <FontAwesomeIcon icon={faCoins} size={24} color="rgb(242, 204, 42)" style={styles.icon} />
          </View>
        </Card>
        <View>
        <TouchableOpacity style={styles.button} onPress={handleRecharge}>
      <Text style={styles.buttonText}>Rechargez vos Food Coins</Text>
    </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.main}>
          <Text style={styles.text2}>Moyens de paiement</Text>
        </View>
        <View
          style={{
            width: 313,
            borderBottomWidth: 1,
            borderBottomColor: 'grey',
            marginTop: 19,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}
        >
          <FontAwesomeIcon icon={faCreditCard} size={20} color="rgb(30, 48, 80)" style={{ marginRight: 10 }} />
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontStyle: 'normal',
              fontWeight: '500',
              lineHeight: 36,
              textAlign: 'left',
            }}
          >
            Mastercard 0347
          </Text>
        </View>
        <View
          style={{
            width: 313,
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: 'grey',
            marginTop: 19,
            paddingHorizontal: 10,
          }}
        >
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={() => {
              Alert.alert(
                'Apple Pay',
                'Le paiement par Apple pay est autorisé.',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                { cancelable: false }
              );
            }}
          >
            <FontAwesomeIcon icon={faAppleAlt} size={20} color="rgb(30, 48, 80)" style={{ marginRight: 10 }} />
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontStyle: 'normal',
                fontWeight: '500',
                lineHeight: 36,
                textAlign: 'left',
              }}
            > 
              Apple Pay
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: 'auto' }}
            onPress={() => {
              Alert.alert(
                'Apple Pay',
                'Vous pouvez désormais payer avec Apple pay.',
                [{ text: 'Je comprends.', onPress: () => console.log('OK Pressed') }],
                { cancelable: false }
              );
            }}
          >
            <FontAwesomeIcon icon={faArrowRight} size={20} color="rgb(30, 48, 80)" />
          </TouchableOpacity>
        </View>
        <View style={styles.main}>
          <Text style={styles.text2}>Promotions et réductions</Text>
        </View>
        <View style={styles.couponContainer}>
          <View style={styles.promotionContainer}>
            <Text style={styles.promotionText}>Profitez de 10% de bonus sur chaque recharge !</Text>
          </View>
        </View>
        <StatusBar style="auto" />
      </ScrollView>
    </Screen>
  );
}

const styles = {
  container: {
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: 300,
    height: 150,
    border: "none",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 20,
  },
  text1: {
    color: "black",
    fontSize: 32,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  text2: {
    fontWeight: "bold",
    fontSize: 18,
    color: "black",
    marginTop: 10,
    marginLeft: 25,
  },
  text3: {
    opacity: 0.5,
    fontWeight: "bold",
    fontSize: 18,
    color: "black",
  },
  main: {
    marginTop: 20,
    alignSelf: "flex-start",
    marginLeft: 25,
  },
  button: {
    display: "flex",
    paddingVertical: 12,
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    borderRadius: 99,
    backgroundColor: "#E71C6B",
    marginTop:19,
    alignSelf: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 16,
  },
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  icon: {
    marginLeft: 5,
    color: "green"
  },
  promotionContainer: {
    width: 313,
    // borderBottomWidth: 1,
    // borderBottomColor: 'grey',
    marginTop: 19,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  promotionText: {
    color: 'gray',
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: '500',
    lineHeight: 36,
    textAlign: 'left',
  },
  couponContainer: {
    // marginVertical: 10,
    // paddingHorizontal: 15,
    // paddingVertical: 10,
    // borderWidth: 2,
    // borderColor: '#E71C6B',
  },
};