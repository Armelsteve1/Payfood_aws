import React from 'react'
import { Image, StyleSheet, View, Text } from 'react-native'
import AppButton from '../component/AppButton';
import Screen from '../component/Screen';
import colors from '../component/configs/colors';
import { useNavigation } from '@react-navigation/native';
import tailwind from 'tailwind-react-native-classnames';
import { Ionicons } from '@expo/vector-icons'

function SuccessSignUpScreen() {

    const navigation = useNavigation();

    return (
        <Screen style={styles.container}>
            <Image style={styles.logo} source={require('../assets/logo.png')} />
            <View style={styles.content}>
                <Ionicons name="heart-circle-outline" size={60} color="#02c2b3" />
                <Text style={styles.title}>Bienvenue</Text>
                <Text style={styles.text}>Votre compte a bien été activé.</Text>
                <View style={styles.buttons}>
                    <AppButton onPress={() => navigation.navigate('SignIn')} title="Se connecter" color="black" />
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
        width: 400, 
        textAlign: 'center',
        marginTop: 10,
        color: colors.gray
    },
    buttons: {
        width: '70%',
        marginTop: 10,
    },
    logo: {
        top: -240,
        alignSelf: 'center',
    },
})

export default SuccessSignUpScreen;