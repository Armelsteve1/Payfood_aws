import React, { useState, useContext } from 'react';
import { View, Alert, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppForm from '../component/forms/AppForm';
import AppFormFeilds from '../component/forms/AppFormFeilds';
import AppSubmitButton from '../component/forms/AppSubmitButton';
import colors from '../component/configs/colors';
import Screen from '../component/Screen';
import { Auth } from 'aws-amplify';

const ConfirmationScreen = ({ route }) => {
  const { username } = route.params;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmation = async (values) => {
    setIsLoading(true);
    try {

      await Auth.confirmSignUp(username, values.code);
      // navigation.navigate("SuccessSignUpScreen");

      console.log('After confirmSignUp', username);
      console.log('✅ Success');
      
    } catch (error) {
      console.error('Error during confirmation', error);
      Alert.alert('Erreur de confirmation', error.message);
    }
    setIsLoading(false);
  }

  if (isLoading) {
    return <ActivityIndicator size="large" color="#FF3C6E" />;
  }

  return (
    <Screen style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.wellcomeTo}>
          Confirmer votre code Payfood
        </Text>
        <View style={styles.form}>
          <AppForm
            initialValues={{ code: "", }}
            onSubmit={handleConfirmation}
          >
            <AppFormFeilds
              name="code"
              placeholder="Code de confirmation"
              keyboardType="numeric"
            />
            <AppSubmitButton title="Confirmer" />
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
});

export default ConfirmationScreen;
