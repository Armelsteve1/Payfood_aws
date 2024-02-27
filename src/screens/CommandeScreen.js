import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';

const CommandeScreen = ({ ajouterCommandeHistorique, ajouterCommandeEnCours }) => {
    const [historiqueCommandes, setHistoriqueCommandes] = useState([]);
    const [commandesEnCours, setCommandesEnCours] = useState([]);

    const handleAjouterCommandeHistorique = (commande) => {
        setHistoriqueCommandes([...historiqueCommandes, commande]);
    };

    const handleAjouterCommandeEnCours = (commande) => {
        setCommandesEnCours([...commandesEnCours, commande]);
    };

    return (
        <View>
            <Text>Historique des commandes :</Text>
            <FlatList
                data={historiqueCommandes}
                renderItem={({ item }) => <Text>{item}</Text>}
                keyExtractor={(item, index) => index.toString()}
            />

            <Text>Commandes en cours :</Text>
            <FlatList
                data={commandesEnCours}
                renderItem={({ item }) => <Text>{item}</Text>}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

export default CommandeScreen;
