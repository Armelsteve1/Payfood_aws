import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Card } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCoins, faCreditCard, faAppleAlt, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Screen from '../component/Screen';
import tailwind from 'tailwind-react-native-classnames';
import AppHead from '../component/AppHead';
import { useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';

export default function WalletScreen() {
  const [rechargeAmount, setRechargeAmount] = useState('0,00');
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await Auth.currentAuthenticatedUser();
        setUser(userData.attributes);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (user !== null) {
      fetchCoins();
    }
  }, [user]);

  const fetchCoins = async () => {
    try {

      const response = await fetch(`https://tdqoe0yq4c.execute-api.eu-north-1.amazonaws.com/coins/${user.email}`);
      const coinsData = await response.json();

      console.log(coinsData[0].amount);
      
      if (coinsData && coinsData[0].amount) {
        setRechargeAmount(coinsData[0].amount.toString());
      }
    } catch (error) {
      console.error('Error fetching coins:', error);
    }
  };

  return (
    <Screen style={tailwind`flex-1 bg-white`}>
      <AppHead title={`Mon portefeuille`} icon="card-outline" />
      <View contentContainerStyle={styles.cardContainer}>
        <Card containerStyle={styles.card}>
          <View style={styles.coinContainer}>
            <Text style={styles.text1}>Gusto </Text>
            <Text style={styles.text1}>{rechargeAmount}</Text>
            <FontAwesomeIcon icon={faCoins} size={24} color="rgb(242, 204, 42)" style={styles.icon} />
          </View>
        </Card>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.main}>
          <Text style={styles.text2}>Moyens de paiement</Text>
        </View>
        <View style={styles.paymentMethod}>
          <FontAwesomeIcon icon={faCreditCard} size={20} color="rgb(30, 48, 80)" style={styles.paymentIcon} />
          <Text style={styles.paymentText}>Mastercard 0347</Text>
        </View>
        <View style={styles.paymentMethod}>
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
            <FontAwesomeIcon icon={faAppleAlt} size={20} color="rgb(30, 48, 80)" style={styles.paymentIcon} />
            <Text style={styles.paymentText}>Apple Pay</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.arrowIcon}
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: 300,
    height: 150,
    border: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  text1: {
    color: 'black',
    fontSize: 32,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  text2: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
    marginTop: 10,
    marginLeft: 25,
  },
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 5,
    color: 'green',
  },
  main: {
    marginTop: 20,
    alignSelf: 'flex-start',
    marginLeft: 25,
  },
  paymentMethod: {
    width: 313,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    marginTop: 19,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  paymentIcon: {
    marginRight: 10,
  },
  paymentText: {
    color: 'black',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 36,
    textAlign: 'left',
  },
  arrowIcon: {
    marginLeft: 'auto',
  },
  promotionContainer: {
    width: 313,
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
  couponContainer: {},
};
