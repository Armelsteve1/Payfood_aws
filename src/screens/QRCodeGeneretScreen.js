import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Share } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Ionicons } from '@expo/vector-icons';
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

  const handleShareQRCode = async () => {
    try {
      const result = await Share.share({
        message: qrCodeValue,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('QR code partagé avec succès');
        } else {
          console.log('Partage annulé');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Partage fermé');
      }
    } catch (error) {
      console.error('Erreur de partage :', error.message);
    }
  };
  return (
    <Screen style={tailwind`flex-1 bg-white`}>
      <View style={styles.container}>
        <AppHead title={`Qr code`} icon="qr-code-outline" />
        <View style={styles.content}>
          <TouchableOpacity style={styles.button} onPress={generateQRCode}>
            <Text style={styles.buttonText}>Générer Mon QR Code</Text>
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
              <TouchableOpacity style={styles.shareButton} onPress={handleShareQRCode}>
                <Ionicons name="share-social-outline" size={24} color="white" />
              </TouchableOpacity>
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
  shareButton: {
    backgroundColor: '#FF3C6E',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
});

export default QRCodeGenerator;
