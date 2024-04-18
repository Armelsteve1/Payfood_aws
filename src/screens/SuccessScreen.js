import React, { useState } from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native';
import AppButton from '../component/AppButton';
import Screen from '../component/Screen';
import colors from '../component/configs/colors';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const SuccessScreen = ({ route }) => {
    const { orderData } = route.params;
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <Screen style={styles.container}>
            <Image style={styles.logo} source={require('../assets/logo.png')} />
            <View style={styles.content}>
                <Ionicons name="checkmark-circle" size={60} color="green" />
                <Text style={styles.title}>Succès</Text>
                <Text style={styles.text}>Votre commande a bien été prise en compte.</Text>
                <TouchableOpacity
                    style={styles.downloadButton}
                    onPress={() => setModalVisible(true)}
                >
                    <Ionicons name="download-outline" size={24} color={colors.primary} />
                    <Text style={styles.downloadText}>Télécharger le ticket</Text>
                </TouchableOpacity>
                <View style={styles.buttons}>
                    <AppButton onPress={() => navigation.navigate('Accueil')} title="Aller à l'accueil" color="black" />
                </View>
            </View>
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Order details</Text>
                        <Text>{JSON.stringify(orderData, null, 2)}</Text>
                        <TouchableOpacity
                            style={styles.modalCloseButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.modalCloseButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: colors.white,
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        width: '80%',
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalCloseButton: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        alignSelf: 'flex-end',
    },
    modalCloseButtonText: {
        color: colors.white,
        fontWeight: 'bold',
    },
});

export default SuccessScreen;
