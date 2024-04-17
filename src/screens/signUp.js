import React from 'react';
import { View, Alert, StyleSheet, Text, Image } from 'react-native';
import { Auth } from 'aws-amplify';
import { useNavigation } from '@react-navigation/native';
import Screen from '../component/Screen';
import colors from '../component/configs/colors';
import AppForm from '../component/forms/AppForm';
import AppFormFields from '../component/forms/AppFormFeilds';
import AppSubmitButton from '../component/forms/AppSubmitButton';
import { v4 as uuidv4 } from 'uuid';

const SignUp = () => {
  const navigation = useNavigation();

  const signUpUser = async (values) => {

    try {

      const user = await Auth.signUp({
        username: values.email,
        password: values.password,
      });

      const userId = uuidv4().substring(0, 10);

      const userData = {
        id: userId,
        username: values.username,
        email: values.email,
        createdAt: new Date().toISOString(),
      };

      console.log(values);

      const response = await fetch('https://kkwnqgn1pb.execute-api.eu-north-1.amazonaws.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to add user');
      }

      console.log('Sign up successful:', user);

      navigation.navigate('ConfirmationScreen', { username: values.email });

    } catch (error) {

      console.log('Error signing up:', error);

      Alert.alert(
        'Erreur',
        'Une erreur est survenue lors de votre inscription.'
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
            initialValues={{ username: '', email: '', password: '' }}
            onSubmit={(values) => signUpUser(values)}
          >
            <AppFormFields name="username" placeholder="Username" />
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
