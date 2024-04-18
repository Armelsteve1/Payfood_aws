import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image
} from "react-native";
import { Icon } from "react-native-elements";
import colors from '../component/configs/colors';
import Screen from '../component/Screen';
import AppHead from '../component/AppHead';
import tailwind from 'tailwind-react-native-classnames';

const CommandeCard = ({ commande, onPress }) => {
  const {
    id,
    customer,
    date,
    price,
  } = commande;

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <View style={styles.cardHeader}>
        <Text style={styles.commandeNumber}>Commande #{id}</Text>
      </View>
      <View style={styles.cardContent}>
        <Text>Client: {customer}</Text>
        <Text>Date: {date}</Text>
        <Text>Total: {price}€</Text>
      </View>
    </TouchableOpacity>
  );
};

const CommandeRestaurant = ({ onBackPress }) => {
  const [commandes, setCommandes] = useState([]);
  const [triType, setTriType] = useState("recent");

  useEffect(() => {
    const fetchCommandes = async () => {
      try {
        const response = await fetch("https://cwi4gwogwe.execute-api.eu-north-1.amazonaws.com/orders");
        const data = await response.json();
        setCommandes(data);
        console.log(data,'mes commande')
      } catch (error) {
        console.error("Erreur lors de la récupération des commandes:", error);
      }
    };

    fetchCommandes();
  }, []);

  const handleCommandePress = (commandeId) => {
  };

  const handleTriRecent = () => {
    setTriType("recent");
    const commandesTriees = [...commandes].sort((a, b) => new Date(b.date) - new Date(a.date));
    setCommandes(commandesTriees);
  };

  const handleTriAlphabetique = () => {
    setTriType("alphabetique");
    const commandesTriees = [...commandes].sort((a, b) => a.customer.localeCompare(b.customer));
    setCommandes(commandesTriees);
  };

  return (
    <Screen style={tailwind`flex-1 bg-white`}>
      <AppHead title={`Historique de commandes`} icon="receipt-outline" />
      <Image style={styles.logo} source={require('../assets/logo.png')} />

      {/* <View style={styles.filterContainer}>
        <TouchableOpacity onPress={handleTriRecent} style={triType === "recent" ? styles.activeButton : styles.button}>
          <Text style={triType === "recent" ? styles.activeButtonText : styles.buttonText}>Plus Récent</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleTriAlphabetique} style={triType === "alphabetique" ? styles.activeButton : styles.button}>
          <Text style={triType === "alphabetique" ? styles.activeButtonText : styles.buttonText}>Alphabétique</Text>
        </TouchableOpacity>
      </View> */}
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
  cardContent: {},
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 16,
  },
  button: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.black,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 16,
  },
  activeButton: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.black,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 16,
    backgroundColor: colors.rose,
  },
  buttonText: {
    fontSize: 16,
    color: colors.black,
  },
  activeButtonText: {
    fontSize: 16,
    color: colors.black,
  },
  logo: {
    alignSelf: 'center',
    marginTop: 10,
},
});

export default CommandeRestaurant;