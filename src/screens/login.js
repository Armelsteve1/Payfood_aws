import React, { useContext } from 'react';
import { View, Text, Alert, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppForm from '../component/forms/AppForm';
import AppFormFeilds from '../component/forms/AppFormFeilds';
import AppSubmitButton from '../component/forms/AppSubmitButton';
import colors from '../../src/component/configs/colors';
import Screen from '../component/Screen';
import AuthContext from '../hooks/AuthContext';

const LoginScreen = () => {
    const { signIn } = useContext(AuthContext);
    const navigation = useNavigation();

    const handleLogin = async (values) => {
        try {
            await signIn(values.email, values.password);
            navigation.navigate('Accueil');
            console.log('✅ Success');
        } catch (error) {
            Alert.alert('Erreur de connexion', error.message);
        }
    }

    return (
        <Screen style={styles.container}>
            <Image style={styles.logo} source={require("../assets/logo.png")} />
            <View style={styles.wrapper}>
                <Text style={styles.wellcomeTo}>
                    Se connecter à Payfood
                </Text>
                <View style={styles.form}>
                    <AppForm
                        initialValues={{ email: "", password: "" }}
                        onSubmit={(values) => handleLogin(values)}
                    >
                        <AppFormFeilds
                            name="email"
                            placeholder="Email"
                            keyboardType="email-address"
                        />
                        <AppFormFeilds
                            name="password"
                            placeholder="Mot de passe"
                            autoCompleteType="off"
                            password={true}
                        />
                        <AppSubmitButton title="Se connecter" />
                    </AppForm>
                </View>

                <Text style={styles.join}>
                    Vous n'avez pas encore de compte ?{" "}
                    <Text
                        onPress={() => navigation.navigate("SignUp")}
                        style={{ color: colors.primary }}
                    >
                        S'inscrire
                    </Text>
                </Text>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        justifyContent: 'center'
    },
    logo: {
        alignSelf: "center",
        top: -200
    },
    wrapper: {
        paddingHorizontal: 20,
    },
    wellcomeTo: {
        fontSize: 23,
        fontWeight: "700",
        color: colors.secondary,
        marginTop: 20,
        textAlign: "center",
    },
    brand: {
        fontSize: 23,
        color: colors.primary,
        textAlign: "center",
        fontWeight: "500",
    },
    form: {
        marginTop: 10,
    },
    join: {
        marginTop: 16,
        textAlign: "center",
    },
    or: {
        color: colors.gray,
        textAlign: "center",
        marginVertical: 20,
    },
});

export default LoginScreen;
