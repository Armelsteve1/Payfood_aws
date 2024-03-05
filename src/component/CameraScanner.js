import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Camera } from "expo-camera";
import { WebView } from "react-native-webview";

export default function CameraScanner({ handleGoBack }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedUrl, setScannedUrl] = useState(null);
  console.log(scannedUrl)

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    if (scannedUrl) {
      // Scanned URL is available, open it in a WebView
      setScanned(true);
    }
  }, [scannedUrl]);

  const handleScanAgain = () => {
    setScanned(false);
  };

  const handleBarCodeScannedInternal = ({ data }) => {
    console.log(data, "Coordonées code Qr");
    setScannedUrl(data);
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {

    return (
      <Text style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        Pas d'accés à la caméra
      </Text>
    );
  }

  if (scanned) {

    if (scannedUrl) {

      return <WebView source={{ uri: scannedUrl }} />;

    } else {

      return (

        <View>

          <TouchableOpacity style={styles.button} onPress={handleScanAgain}>

            <Text style={styles.buttonText}>Scanner encore </Text>

          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleGoBack}>

            <Text style={styles.buttonText}>Retour</Text>

          </TouchableOpacity>

        </View>

      );

    }

  }



  return (

    <View style={styles.container}>

      <Camera

        style={styles.camera}

        onBarCodeScanned={handleBarCodeScannedInternal}

      />

      {/* <TouchableOpacity style={styles.button} onPress={handleGoBack}>

        <Text style={styles.buttonText}>Annuler</Text>

      </TouchableOpacity> */}

    </View>

  );

}




const styles = StyleSheet.create({

  container: {

    flex: 1,

    justifyContent: "center",

    alignItems: "center",

  },

  camera: {

    width: "80%",
    height: '80%',
    aspectRatio: 1,

  },

  button: {

    backgroundColor: "#3c7dec",

    padding: 10,

    borderRadius: 5,

    marginTop: 10,

  },

  buttonText: {

    color: "#fff",

    fontWeight: "bold",

    textAlign: "center",


  },

});