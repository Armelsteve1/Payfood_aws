import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, TextInput, Button } from "react-native";
import { Card } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { Picker } from '@react-native-picker/picker';
import AppHead from '../component/AppHead';
import Screen from '../component/Screen'
import tailwind from 'tailwind-react-native-classnames';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';


export default function WalletScreen() {
  const [selectedTransaction, setSelectedTransaction] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [rechargeAmount] = useState('');

  const transactions = [
    { label: 'Transaction 1', value: 'transaction1' },
    { label: 'Transaction 2', value: 'transaction2' },
  ];

  const handleRecharge = () => {
    console.log("Montant de recharge :", rechargeAmount);
    setModalVisible(false);
  };

  return (
    <Screen style={tailwind`flex-1 bg-white`}>
      <AppHead title={`Mon portefeuille`} icon="card-outline" />
      <View contentContainerStyle={styles.cardContainer}>
        <Card containerStyle={styles.card}>
          <View style={styles.coinContainer}>
            <Text style={styles.text1}>15,00</Text>
            <FontAwesomeIcon icon={faCoins} size={24} color="rgb(242, 204, 42)" style={styles.icon} />
          </View>
        </Card>
        {/* <View style={styles.main}>
          <Text style={styles.text2}>Food Coins</Text>
        </View> */}
        <View>
          <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Rechargez vos Food Coins</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.main}>
          <Text style={styles.text2}>Moyens de paiement</Text>
        </View>
        {/* <View>
          <TouchableOpacity
            style={{
              width: 313,
              height: 40,
              flexShrink: 0,
              borderRadius: 8,
              // backgroundColor: "#E71C6B",
              shadowColor: "rgba(0, 0, 0, 0.25)",
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowRadius: 4,
              shadowOpacity: 2,
              marginTop: 19,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: "#000",
                fontSize: 20,
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: 36,
                textAlign: 'left'
              }}
            >
              Apple pay
            </Text>
          </TouchableOpacity>
        </View> */}
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
        <View style={styles.main}>
          <Text style={styles.text2}>Autres</Text>
        </View>
        <View>
          <Picker
            selectedValue={selectedTransaction}
            onValueChange={(itemValue, itemIndex) => setSelectedTransaction(itemValue)}
            style={{
              width: 313,
              height: 40,
              flexShrink: 0,
              borderRadius: 8,
              backgroundColor: '#E71C6B',
              shadowColor: 'rgba(0, 0, 0, 0.25)',
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowRadius: 4,
              shadowOpacity: 2,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 19,
            }}
          >
            {transactions.map((transaction) => (
              <Picker.Item key={transaction.value} label={transaction.label} value={transaction.value} />
            ))}
          </Picker>
        </View>
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
        </Modal>
        <StatusBar style="auto" />
      </ScrollView>
    </Screen>
  );
}

const styles = {
  container: {
    // flex: 1,
    marginTop: 40,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: 300,
    height: 150,
    border: "none",
    // flexShrink: 0,
    // borderRadius: 8,
    // backgroundColor: "#E71C6B",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 20,
  },
  // text: {
  //   // color: "black",
  //   fontSize: 16,
  //   fontWeight: "900",
  //   textTransform: "uppercase",
  // },
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
  // main1: {
  //   marginTop: 20,
  //   alignSelf: "center",
  //   marginTop: 20,
  // },
  button: {
    display: "flex",
    // width: 143,
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
};