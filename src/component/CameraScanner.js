import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Camera } from "expo-camera";
import { useNavigation } from '@react-navigation/native';

const CameraScanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScannedInternal = ({ data }) => {
    setScanned(true);
    setScannedData(data);
    navigateToDetailsScreen(data);
  };
  console.log (data,scannedData, 'data scanner')
    const navigateToDetailsScreen = (data) => {
    navigation.navigate('DetailsScreen', { scannedData: data });
  };
  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return (
      <Text style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        Pas d'accès à la caméra
      </Text>
    );
  }

  if (scanned) {
    return (
      <View style={styles.container}>
        <Text>Données scannées : {scannedData}</Text>
        {/* Redirection vers DetailsScreen avec les données scannées */}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        onBarCodeScanned={handleBarCodeScannedInternal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    width: "80%",
    height: "80%",
    aspectRatio: 1,
  },
});

export default CameraScanner;
