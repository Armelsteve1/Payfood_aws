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
import { API, graphqlOperation, Auth } from 'aws-amplify';

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
  const [allCartItems, setAllCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await Auth.currentAuthenticatedUser();
        setUser(userData.attributes);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

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
        returnURL: 'schema',
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

    // if (error) {
      // Alert.alert('Payment failed', `Error code: ${error.code}`, error.message);
    // } else {
      addOrder();
      setPaymentSheetEnabled(false);
    // }
    setLoading(false);
  };

  useEffect(() => {
    initialisePaymentSheet();
  }, []);

  const addOrder = async () => {
    setLoadingOrder(true);
  
    try {
      const response = await fetch('https://cwi4gwogwe.execute-api.eu-north-1.amazonaws.com/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: '3',
          price: '120',
          name: 'frites',
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add order');
      }
  
      navigation.navigate("SuccessScreen");
    } catch (error) {
      console.error('Error adding order:', error);
      console.error('Response status:', response.status);
      console.error('Response body:', await response.text());
    } finally {
      setLoadingOrder(false);
    }
  };
  


  return (
    <View style={styles.container}>
      <>
        {loadingOrder ? (
          <View>
            <Text style={tailwind`mt-4`}>Création de votre commande. Veuillez patienter...</Text>
          </View>
        ) : (
          <>
            <PaymentScreen>
              <AppHead title={`Paiement`} icon="cash-outline" />
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
                  title="Payer"
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
  loadingOrderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    width: 100,
    height: 60,
    marginBottom: 10,
  },

  paymentSection: {
    flex: 1,
    marginTop: 30,
    alignItems: 'center',
  },
});

export default CheckoutScreen;
