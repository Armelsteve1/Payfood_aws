import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const QRCodeGenerator = () => {
  const [menuUrl, setMenuUrl] = useState('');
  const [qrCodeValue, setQRCodeValue] = useState('');

  // Fonction pour générer le QR code à partir de l'URL du menu
  const generateQRCode = () => {
    if (menuUrl.trim() !== '') {
      setQRCodeValue(menuUrl);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Générateur de QR Code pour le Menu</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrez l'URL de votre menu"
        value={menuUrl}
        onChangeText={setMenuUrl}
      />
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
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
