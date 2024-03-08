import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import AppHead from '../component/AppHead';
import Screen from '../component/Screen';
import tailwind from 'tailwind-react-native-classnames';

const QRCodeGenerator = () => {
  const [menuUrl, setMenuUrl] = useState('https://qxqiytxy36.execute-api.eu-north-1.amazonaws.com/items/rest01/menu01');
  const [qrCodeValue, setQRCodeValue] = useState('');

  const generateQRCode = () => {
    if (menuUrl.trim() !== '') {
      const newMenuUrl = `https://qxqiytxy36.execute-api.eu-north-1.amazonaws.com/items/rest01/menu01`;
      setMenuUrl(newMenuUrl);
      setQRCodeValue(newMenuUrl);
    }
  };
  return (
    <Screen style={tailwind`flex-1 bg-white`}>
      <View style={styles.container}>
        <AppHead title={`Qr code`} icon="qr-code-outline" />
        <View style={styles.content}>
          <Text style={styles.title}>Générateur de QR Code pour le Menu</Text>
          <TouchableOpacity style={styles.button} onPress={generateQRCode}>
            <Text style={styles.buttonText}>Générer le QR Code</Text>
          </TouchableOpacity>
          {qrCodeValue !== '' && (
            <View style={styles.qrCodeContainer}>
              <QRCode
                value={qrCodeValue}
                size={200}
                color="black"
                backgroundColor="white"
              />
              <Text style={styles.qrCodeText}>Scannez ce QR Code pour accéder à votre menu</Text>
            </View>
          )}
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 22,
  },
  content1: {
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF3C6E',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  qrCodeContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  qrCodeText: {
    marginTop: 10,
  },
});

export default QRCodeGenerator;
