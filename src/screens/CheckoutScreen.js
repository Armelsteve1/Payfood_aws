import React, { useEffect, useState, useContext } from 'react';
import { Alert, Image, StyleSheet, Text, View , ActivityIndicator} from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import PaymentScreen from '../component/PaymentScreen';
import { STRIPE_API_URL } from '../component/configs/apiEndpoints';
import colors from '../component/configs/colors';
import PaymentButton from '../component/PaymentButton';
import tailwind from 'tailwind-react-native-classnames';
import AppHead from '../component/AppHead';
import { useNavigation } from '@react-navigation/core';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { CartContext } from '../hooks/cartContext';

const CheckoutScreen = ({ route }) => {
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

  const { total = 0, count = 0 } = route.params || {};
  const { cartItems, setCartItems } = useContext(CartContext);

  const [orderDetails, setOrderDetails] = useState([]);

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
        merchantDisplayName: 'Payfood Inc.',
        applePay: false,
        merchantCountryCode: 'FR',
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
      addCoins();
      addOrder();
      setPaymentSheetEnabled(false);
    // }
    setLoading(false);
  };

  useEffect(() => {
    initialisePaymentSheet();
  }, []);

  const addCoins = async () => {
    try {
      const customerEmail = user.email;
      const currentDate = new Date().toISOString();
  
      const existingCoinsResponse = await fetch(`https://tdqoe0yq4c.execute-api.eu-north-1.amazonaws.com/coins/${user.email}`);
      const existingCoinsData = await existingCoinsResponse.json();

      console.log('Existing coins data:', existingCoinsData);

  
      if (existingCoinsData.length > 0) {
        const existingCoinId = existingCoinsData[0].id;
        console.log(existingCoinId);
  
        let updatedCoinData = {
          id: existingCoinId,
          amount: total + existingCoinsData[0].amount,
          customer: customerEmail,
          updatedAt: currentDate
        };

        console.log('Updated coin data:', updatedCoinData);

        const updateResponse = await fetch(`https://tdqoe0yq4c.execute-api.eu-north-1.amazonaws.com/coins/${existingCoinId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedCoinData),
        });
  
        if (!updateResponse.ok) {
          throw new Error('Failed to update coins');
        }
  
        console.log('Coins updated successfully');
      } else {
        
        const getRandomId = () => {
          const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
          let randomId = '';
          for (let i = 0; i < 10; i++) {
            randomId += chars.charAt(Math.floor(Math.random() * chars.length));
          }
          return randomId;
        };
        
        const coinsId = getRandomId();

        let orderData = {
          id: coinsId,
          amount: total,
          customer: customerEmail,
          updatedAt: currentDate
        };

        console.log('New coins data:', orderData);

    
        const response = await fetch('https://tdqoe0yq4c.execute-api.eu-north-1.amazonaws.com/coins', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          
          body: JSON.stringify(orderData),
        });
    
        if (!response.ok) {
          throw new Error('Failed to add coins');
        }
    
        console.log('Coins added successfully');
      }
    } catch (error) {
      console.error('Error adding coins:', error);
    }
  };
  
  

  const addOrder = async () => {
    setLoadingOrder(true);
    
    try {
      const currentDate = new Date().toISOString();
      const foodIds = cartItems.flatMap(item => item.foods.map(food => food.id));
  
      const getRandomId = () => {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let randomId = '';
        for (let i = 0; i < 10; i++) {
          randomId += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return randomId;
      };

      const orderId = getRandomId();
      const customerEmail = user.email;
      
      const foodIdsList = foodIds.map(id => ({ id }));
  
      let orderData = {
        id: orderId,
        price: total,
        foodIds: foodIdsList, 
        date: currentDate,
        paymentCard: paymentMethod ? paymentMethod.label : null,
        paymentCardTypeImage: paymentMethod ? paymentMethod.image : null,
        customer: customerEmail
      };
  
      const response = await fetch('https://cwi4gwogwe.execute-api.eu-north-1.amazonaws.com/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify(orderData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add order');
      }
  
      setCartItems([]);
      setOrderDetails(orderData);
      setTimeout(() => {
        setLoadingOrder(false);
        console.log(orderData)
        navigation.navigate("SuccessScreen", {orderData});
      }, 6000);
    } catch (error) {
      console.error('Error adding order:', error);
      console.error('Response status:', response.status);
      console.error('Response body:', await response.text());
      setLoadingOrder(false);
    }
  };
  
    
  return (
    <View style={styles.container}>
      <>
        {loadingOrder ? (
          <View style={tailwind`flex justify-center items-center h-full`}>
            <View style={tailwind`border border-gray-300 p-4`}>
              <ActivityIndicator color={colors.primary} size="big" />
              <Text style={tailwind`mt-4`}>Validation de votre commande. Veuillez patienter...</Text>
            </View>
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
