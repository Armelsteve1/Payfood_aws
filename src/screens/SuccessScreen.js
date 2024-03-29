import React from 'react'
import { Image, StyleSheet, View, Text } from 'react-native'
import AppButton from '../component/AppButton';
import Screen from '../component/Screen';
import colors from '../component/configs/colors';
import { useNavigation } from '@react-navigation/native';
import tailwind from 'tailwind-react-native-classnames';
import { Ionicons } from '@expo/vector-icons'

function SuccessScreen() {
    const navigation = useNavigation()

    return (
        <Screen style={styles.container}>
            <View style={styles.content}>
                <Ionicons name="checkmark-circle" size={70} color="green" />
                <Text style={styles.title}>Félicitations</Text>
                <Text style={styles.text}>Votre commande est bien prise en compte.</Text>
                <View style={styles.buttons}>
                    <AppButton onPress={() => navigation.navigate('Accueil')} title="Aller à l'accueil" color="black" />
                </View>
            </View>
        </Screen>
    )
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
        width: 280, 
        textAlign: 'center',
        marginTop: 10,
        color: colors.gray
    },
    buttons: {
        width: '70%',
        marginTop: 20
    }
})

export default SuccessScreen