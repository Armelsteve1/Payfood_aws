import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { View, Alert, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppForm from '../component/forms/AppForm';
import AppFormFeilds from '../component/forms/AppFormFeilds';
import AppSubmitButton from '../component/forms/AppSubmitButton';
import colors from '../component/configs/colors';
import Screen from '../component/Screen';
const ConfirmationScreen = ({ route }) => {
    const { username } = route.params;
    const navigation = useNavigation();

    const handleConfirmation = async (values) => {
        try {
            console.log('Before confirmSignUp', username, values.code);
            await Auth.confirmSignUp(username, values.code);
            console.log('After confirmSignUp', username);
            console.log('✅ Success');
            navigation.navigate("Accueil");
        } catch (error) {
            console.error('Error during confirmation', error);
            Alert.alert('Erreur de confirmation', error.message);
        }
    }
    return (
        <Screen style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.wellcomeTo}>
             Confirmer votre code Pay<Text style={styles.brand}>Food</Text>
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
                s'inscrire
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
      or: {
        color: colors.gray,
        textAlign: "center",
        marginVertical: 20,
      },
    });
export default ConfirmationScreen;