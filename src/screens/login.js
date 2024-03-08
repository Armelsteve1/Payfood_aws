import React, { useContext } from 'react';
import { View, Text, Alert, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AppForm from '../component/forms/AppForm';
import AppFormFields from '../component/forms/AppFormFeilds';
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
      navigation.navigate('Main');
      console.log('✅ Success');
    } catch (error) {
      Alert.alert('Erreur de connexion', error.message);
    }
  };

  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require('../assets/logo.png')} />
      <View style={styles.wrapper}>
        <Text style={styles.welcomeText}>Se connecter à Payfood</Text>
        <View style={styles.form}>
          <AppForm
            initialValues={{ email: '', password: '' }}
            onSubmit={(values) => handleLogin(values)}
          >
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
            <AppSubmitButton title="Se connecter" />
          </AppForm>
        </View>

        <Text style={styles.joinText}>
          Vous n'avez pas encore de compte ?{' '}
          <Text
            onPress={() => navigation.navigate('SignUp')}
            style={{ color: colors.primary }}
          >
            S'inscrire
          </Text>
        </Text>
      </View>
      {/* <Image style={styles.gif} source={require('../../assets/gimme-food.gif')} /> */}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  logo: {
    alignSelf: 'center',
    top: -200,
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

export default LoginScreen;
