import React, { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import PaymentScreen from '../component/PaymentScreen';
import { STRIPE_API_URL } from '../component/configs/apiEndpoints';
import colors from '../component/configs/colors';
import PaymentButton from '../component/PaymentButton';
import tailwind from 'tailwind-react-native-classnames';
import AppHead from '../component/AppHead';
import { useNavigation } from '@react-navigation/core';
import { API, graphqlOperation } from 'aws-amplify';
import { addOrder as addOrderMutation } from '../graphql/mutations';

const CheckoutScreen = () => {
  const {
    initPaymentSheet,
    presentPaymentSheet,
    confirmPaymentSheetPayment,
  } = useStripe();
  const [paymentSheetEnabled, setPaymentSheetEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [allCartItems, setAllCartItems] = useState([]); // État local pour les articles du panier
  const [user, setUser] = useState(null); // État local pour les informations de l'utilisateur
  const navigation = useNavigation();

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`${STRIPE_API_URL}/payment-sheet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { paymentIntent, ephemeralKey, customer } = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initialisePaymentSheet = async () => {
    setLoading(true);

    try {
      const {
        paymentIntent,
        ephemeralKey,
        customer,
      } = await fetchPaymentSheetParams();

      const { error, paymentOption } = await initPaymentSheet({
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        customFlow: true,
        merchantDisplayName: 'Example Inc.',
        applePay: false,
        merchantCountryCode: 'US',
        style: 'alwaysDark',
        testEnv: true,
        returnURL: 'your-app-scheme://',
      });

      if (!error) {
        setPaymentSheetEnabled(true);
      }
      if (paymentOption) {
        setPaymentMethod(paymentOption);
      }
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };

  const choosePaymentOption = async () => {
    const { error, paymentOption } = await presentPaymentSheet({
      confirmPayment: false,
    });

    if (error) {
      console.log('error', error);
    } else if (paymentOption) {
      setPaymentMethod({
        label: paymentOption?.label,
        image: paymentOption?.image,
      });
    } else {
      setPaymentMethod(null);
    }
  };

  const onPressBuy = async () => {
    setLoading(true);
    const { error } = await confirmPaymentSheetPayment();

    if (error) {
      Alert.alert('Payment failed', `Error code: ${error.code}`, error.message);
    } else {
      addOrder();
      setPaymentSheetEnabled(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    initialisePaymentSheet();
    // Mettez à jour l'état local pour les articles du panier ici
    // Mettez à jour l'état local pour les informations de l'utilisateur ici
    // ...

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addOrder = async () => {
    setLoadingOrder(true);
    try {
      await API.graphql(graphqlOperation(addOrderMutation, {
        input: {
          items: allCartItems,
          email: user?.email,
          timestamp: new Date().toISOString()
        }
      }));
      setTimeout(() => {
        setLoadingOrder(false);
        setAllCartItems([]); // Réinitialiser l'état local pour les articles du panier
        navigation.navigate("SuccessScreen");
      }, 1500)
    } catch (e) {
      setLoadingOrder(false)
      Alert.alert('Error', e.message)
    }
  }

  return (
    <View style={styles.container}>
      <>
        {loadingOrder ? (
          <View>
            <Text style={tailwind`font-bold text-lg w-3/4 text-center`}>{"Congratulations!\nPayment successfully done!"}</Text>
            <Text style={tailwind`mt-4`}>Création de votre commande. Veuillez patienter...</Text>
            {/* <Image source={require('../assets/images/loaging.gif')} style={tailwind`w-72 h-72`} /> */}
          </View>
        ) : (
          <>
            <PaymentScreen>
              <AppHead title={`Checkout`} />
              <View style={styles.Checkout}>
                <PaymentButton
                  variant="primary"
                  loading={loading}
                  title={
                    paymentMethod ? (
                      <View style={styles.row}>
                        <Image
                          source={{
                            uri: `data:image/png;base64,${paymentMethod?.image}`,
                          }}
                          style={styles.image}
                        />
                        <Text style={styles.text}>{paymentMethod?.label}</Text>
                      </View>
                    ) : (
                      'Choisir le mode de paiement'
                    )
                  }
                  disabled={!paymentSheetEnabled}
                  onPress={choosePaymentOption}
                />
              </View>

              <View style={styles.section}>
                <PaymentButton
                  variant="primary"
                  loading={loading}
                  disabled={!paymentMethod || !paymentSheetEnabled}
                  title="Pay"
                  onPress={onPressBuy}
                />
              </View>
            </PaymentScreen>
          </>
        )}
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: colors.white,
  },
  Checkout: {
    flex:1,
    marginTop:50,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flex:1,
    marginTop: 30,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  paymentMethodTitle: {
    color: colors.slate,
    fontWeight: 'bold',
  },
  image: {
    width: 26,
    height: 20,
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
});

export default CheckoutScreen;
