import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import colors from '../component/configs/colors';
import Screen from '../component/Screen';
import AppHead from '../component/AppHead';
import tailwind from 'tailwind-react-native-classnames';

const CommandeCard = ({ commande, onPress }) => {
    const {
      id,
      items,
      total,
      paymentMethod,
      paymentDetails,
      date,
    } = commande;
  
    return (
      <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
        <View style={styles.cardHeader}>
          <Text style={styles.commandeNumber}>Commande #{id}</Text>
        </View>
        <View style={styles.cardContent}>
          {items.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <Text>{item.name}</Text>
              <Text>{item.price}</Text>
            </View>
          ))}
          <View style={styles.totalContainer}>
            <Text>Total</Text>
            <Text>{total}</Text>
          </View>
          <View style={styles.paiementContainer}>
            <Text>Payé via {paymentMethod} {paymentDetails} le {date}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  

const CommandeRestaurant = ({ onBackPress }) => {
  const handleCommandePress = (commandeId) => {
    const selected = commandes.find((commande) => commande.id === commandeId);
  };
  const handleShowFilter = () => {
  };
  const commandes = [
    {
      id: "4864",
      items: [
        { name: "Chicken wings", price: "11€" },
        { name: "Ice Tea", price: "2,30€" },
      ],
      total: "13,30€",
      paymentMethod: "MasterCard",
      paymentDetails: "0651",
      date: "24/01/2024 à 12:34",
    },
    {
        id: "48624",
        items: [
            { name: "Chicken wings", price: "11€" },
            { name: "Ice Tea", price: "2,30€" },
        ],
        total: "13,30€",
        paymentMethod: "MasterCard",
        paymentDetails: "0651",
        date: "24/01/2024 à 12:34",
    },
    {
        id: "48625",
        items: [
            { name: "Chicken wings", price: "11€" },
            { name: "Ice Tea", price: "2,30€" },
        ],
        total: "13,30€",
        paymentMethod: "MasterCard",
        paymentDetails: "0651",
        date: "24/01/2024 à 12:34",
    },
  ];

  return (
    <Screen style={tailwind`flex-1 bg-white`}>
     <AppHead title={`Mon Restaurant`} icon="person-outline" />
     <View style={styles.filterContainer}>
        <View style={styles.filterButton} onPress={handleShowFilter}>
            <Icon name="filter-list" size={24} color={colors.black} />
        </View>
        <TouchableOpacity onPress={handleShowFilter}>
        </TouchableOpacity>
    </View>
    <View style={styles.container}>
        <FlatList
        data={commandes}
        renderItem={({ item }) => (
            <CommandeCard commande={item} onPress={() => handleCommandePress(item.id)} />
        )}
        keyExtractor={(item) => item.id}
        />
    </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor:'#fff'
  },
  cardContainer: {
    backgroundColor: "#EAF0F0",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  commandeNumber: {
    fontWeight: "bold",
    fontSize: 18,
  },
  date: {
    fontSize: 14,
  },
  cardContent: {},
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    borderTopWidth: 1,
    paddingTop: 8,
  },
  paiementContainer: {
    marginTop: 8,
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginRight: 16,
  },
  filterButton: {
    borderWidth: 1,
    borderColor: "#E71C6B",
    borderRadius: 5,
    padding: 8,
  },
  buttonTitle: {
    marginRight: 5,
  },
  
  buttonTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 10,
  },
  buttonTitle: {
    marginRight: 5,
  },
});

export default CommandeRestaurant;
