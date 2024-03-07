import React, { useState } from 'react';
import { View, Alert, StyleSheet, Text, Image } from 'react-native';
import { Auth } from 'aws-amplify';
import { useNavigation } from '@react-navigation/native';

import AppForm from '../component/forms/AppForm';
import AppFormFields from '../component/forms/AppFormFeilds';
import AppSubmitButton from '../component/forms/AppSubmitButton';

import Screen from '../component/Screen';
import colors from '../component/configs/colors';

const SignUp = () => {
  const navigation = useNavigation();

  const signUpUser = async (values) => {
    try {
      const user = await Auth.signUp({
        username: values.email,
        password: values.password,
      });
      console.log('Sign up successfull:', user);
      navigation.navigate('ConfirmationScreen', { username: values.email });
    } catch (error) {
      console.log('Error signing up:', error);
      Alert.alert(
        'Erreur',
        'Une erreur est servenue lors de votre inscription.'
      );
    }
  };

  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require('../assets/logo.png')} />
      <View style={styles.wrapper}>
        <Text style={styles.welcomeText}>Rejoignez Payfood</Text>
        <View style={styles.form}>
          <AppForm
            initialValues={{ name: '', email: '', password: '' }}
            onSubmit={(values) => signUpUser(values)}
          >
            <AppFormFields name="name" placeholder="Username" />
            <AppFormFields
              name="email"
              placeholder="Email"
              keyboardType="email-address"
            />
            <AppFormFields
              name="password"
              placeholder="Mot de passe"
              autoCompleteType="off"
              password={true}
            />
            <AppSubmitButton title="S'inscrire" />
          </AppForm>
        </View>
        <Text style={styles.joinText}>
          Vous avez déjà un compte ?{' '}
          <Text
            onPress={() => navigation.navigate('SignIn')}
            style={{ color: colors.primary }}
          >
            Se connecter
          </Text>
        </Text>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  logo: {
    top: -170,
    alignSelf: 'center',
  },
  wrapper: {
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 23,
    fontWeight: '700',
    color: colors.secondary,
    marginTop: 20,
    textAlign: 'center',
  },
  form: {
    marginTop: 10,
  },
  joinText: {
    marginTop: 16,
    textAlign: 'center',
  },
});

export default SignUp;
