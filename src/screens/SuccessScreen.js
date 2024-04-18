import React from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native'; // Import Alert
import AppButton from '../component/AppButton';
import Screen from '../component/Screen';
import colors from '../component/configs/colors';
import { useNavigation } from '@react-navigation/native';
import { PDFDocument, PDFPage } from 'react-native-pdf-lib'; // Removed unnecessary imports
import { Ionicons } from '@expo/vector-icons';

const SuccessScreen = ({ route }) => {
    const { orderData } = route.params;
    const navigation = useNavigation();

    console.log(orderData);

    return (
        <Screen style={styles.container}>
            <Image style={styles.logo} source={require('../assets/logo.png')} />
            <View style={styles.content}>
                <Ionicons name="checkmark-circle" size={60} color="green" />
                <Text style={styles.title}>Succès</Text>
                <Text style={styles.text}>Votre commande a bien été prise en compte.</Text>
                <TouchableOpacity style={styles.downloadButton}>
                    <Ionicons name="download-outline" size={24} color={colors.primary} />
                    <Text style={styles.downloadText}>Télécharger le ticket</Text>
                </TouchableOpacity>
                <View style={styles.buttons}>
                    <AppButton onPress={() => navigation.navigate('Accueil')} title="Aller à l'accueil" color="black" />
                </View>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.white
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    text: {
        width: 400,
        textAlign: 'center',
        marginTop: 10,
        color: colors.gray
    },
    downloadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    downloadText: {
        marginLeft: 5,
        color: colors.primary,
    },
    buttons: {
        width: '70%',
        marginTop: 10,
    },
    logo: {
        top: -220,
        alignSelf: 'center',
    },
});

export default SuccessScreen;
