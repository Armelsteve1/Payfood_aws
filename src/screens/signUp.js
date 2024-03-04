import React, { useState } from 'react';
import { View, Alert,StyleSheet, Text, Image } from 'react-native';
import { Auth } from 'aws-amplify';
import AppForm from "../component/forms/AppForm";
import Screen from "../component/Screen";
import colors from "../component/configs/colors";
import AppFormFeilds from "../component/forms/AppFormFeilds";
import AppSubmitButton from "../component/forms/AppSubmitButton";
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
    const navigation = useNavigation();

    const signUpUser = async (values) => {
        try {
            const user = await Auth.signUp({
                username: values.email,
                password: values.password
            });
            console.log('Sign up successful:', user);
            navigation.navigate('ConfirmationScreen', { username: values.email }); 
            } catch (error) {
            console.log('Error signing up:', error);
            Alert.alert('Error', 'An error occurred while signing up. Please try again.');
        }
    }
    return (
        <Screen style={styles.container}>
            <Image style={styles.logo} source={require("../assets/logo.png")} />
            <View style={styles.wrapper}>
                <Text style={styles.wellcomeTo}>Rejoignez Pay<Text style={styles.brand}>Food</Text></Text>
                <View style={styles.form}>
                    <AppForm
                        initialValues={{ name: "", email: "", password: "" }}
                        onSubmit={(values) => signUpUser(values)}
                    >
                        <AppFormFeilds name="name" placeholder="pseudo" />
                        <AppFormFeilds name="email" placeholder="Email" keyboardType="email-address" />
                        <AppFormFeilds name="password" placeholder="Mot de passe" autoCompleteType="off" password={true} />
                        <AppSubmitButton title="S'inscrire" />
                    </AppForm>
                </View>
                <Text style={styles.join}>
                    Vous avez déjà un compte?{" "}
                    <Text onPress={() => navigation.navigate("SignIn")} style={{ color: colors.primary }}>Se connecter</Text>
                </Text>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.white,
      justifyContent: 'center',
    },
    logo: {
      top: -170,
      alignSelf: "center",
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

export default SignUp;