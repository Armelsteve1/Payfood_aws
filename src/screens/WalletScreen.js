import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, TextInput, Button } from "react-native";
import { Card } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { Picker } from '@react-native-picker/picker';

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
    <ScrollView contentContainerStyle={styles.container}>
      <Card containerStyle={styles.card}>
        <Text style={styles.text}>FOOD COINS</Text>
        <Text style={styles.text1}>15,00€</Text>
      </Card>
      <View style={styles.main}>
        <Text style={styles.text2}>Food Coins</Text>
      </View>
      <View style={styles.main1}>
        <Text style={styles.text3}>Rechargez vos Food Coins</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Rechargez</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.main}>
        <Text style={styles.text2}>Mode de paiement</Text>
      </View>
      <View>
        <TouchableOpacity
          style={{
            width: 313,
            height: 40,
            flexShrink: 0,
            borderRadius: 8,
            backgroundColor: "#F7F7F7",
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
            Défaut
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={{
            width: 313,
            height: 40,
            flexShrink: 0,
            borderRadius: 8,
            backgroundColor: "#F7F7F7",
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
            Achetez un Food Coins
          </Text>
        </TouchableOpacity>
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
            backgroundColor: '#F7F7F7',
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
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: 317,
    height: 166,
    flexShrink: 0,
    borderRadius: 8,
    backgroundColor: "#FF3C6E",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  text1: {
    color: "#FFF",
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
  main1: {
    marginTop: 20,
  },
  button: {
    display: "flex",
    width: 143,
    paddingVertical: 10,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    borderRadius: 99,
    backgroundColor: "#FF3C6E",
    marginTop:19
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
};