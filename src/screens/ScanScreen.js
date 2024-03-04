import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Alert,
  Dimensions,
  Image,
} from "react-native";
import axios from "axios";
import CameraScanner from "../component/CameraScanner";
import { Card } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

export default function ScannerForm({ setValidTicket }) {
  const [isValidTicket, setIsValidTicket] = useState(false);

  const navigation = useNavigation();

  const [showCamera, setShowCamera] = useState(true);
  const [showInput, setShowInput] = useState(false);
  const [ticketCode, setTicketCode] = useState("");
  const [ticketUrl, setTicketUrl] = useState("");
  const [showTicketDownloader, setShowTicketDownloader] = useState(false);
  const [isCardSelected, setIsCardSelected] = useState(false);

  const handleBarCodeScanned = ({ type, data }) => {
    setShowCamera(false);
    setShowInput(false);
    setTicketCode(data);
    Alert.alert(`Scanned data: ${data}`);
  };

  const handleTicketCodeChange = (value) => {
    console.log(value);
    setTicketCode(value);
  };

  useEffect(() => {
    console.log("isValidTicket changed:", isValidTicket);
  }, [isValidTicket]);

  const handleTicketCodeSubmit = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/tickets/check-validity`,
        {
          params: {
            code: ticketCode,
          },
        }
      );

      if (response.status === 200) {
        // Handle success here
        setValidTicket(true);
        setIsValidTicket(true);
        console.log(response.data);
        Alert.alert(
          "Ticket valide",
          "Vous allez être redirigé vers l'accueil",
          [
            {
              text: "OK",
              onPress: () => {
                console.log("OK Pressed");
                // navigation.navigate("Ticket");
              },
            },
          ]
        );
      } else {
        // Handle error here
        console.log("Should display alert now");
        window.alert(
          "Ticket invalide: Veuillez vérifier votre code de ticket."
        );
        Alert.alert(
          "Ticket invalide",
          "Veuillez vérifier votre code de ticket.",
          [
            {
              text: "OK",
              onPress: () => console.log("OK Pressed"),
            },
          ]
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCameraPress = () => {
    setShowCamera(true);
    setShowInput(false);
  };

  const handleInputPress = () => {
    setIsCardSelected(false);
    setShowInput(true);
    setShowCamera(false);
  };

  const handleCancelPress = () => {
    setShowCamera(false);
    setShowInput(false);
  };

  const handleGoBack = () => {
    setShowCamera(false);
    setShowInput(false);
  };

  const handleLogoPress = () => {
    navigation.navigate("Home");
  };

  // return (
  //   <View style={styles.container}>
  //     <TouchableOpacity onPress={handleLogoPress}>
  //       <Image
  //         source={require('../../assets/image/logo-v.png')}
  //         style={styles.logo}
  //       />
  //     </TouchableOpacity>
  //     {!isCardSelected && !showInput && !showCamera && (
  //       <View>
  //         <UploadTicket />
  //       </View>
  //     )}
  //     <View style={styles.container}>
  //       {showCamera ? (
  //         <CameraScanner
  //           handleBarCodeScanned={handleBarCodeScanned}
  //           handleGoBack={handleCancelPress}
  //         />
  //       ) : showInput ? (
  //         <TicketInput
  //           ticketCode={ticketCode}
  //           handleTicketCodeChange={handleTicketCodeChange}
  //           handleTicketCodeSubmit={handleTicketCodeSubmit}
  //           handleGoBack={handleGoBack}
  //         />
  //       ) : (
  //         // <View style={styles.buttonContainer}>
  //         //   <Card containerStyle={styles.card}>
  //         //     {/* <LinearGradient
  //         //       colors={['#fff265', '#ff5900', '#f5255d']}
  //         //       style={styles.button}
  //         //     >
  //         //       <TouchableOpacity onPress={handleCameraPress}>
  //         //         <View style={styles.buttonContent}>
  //         //           <View style={styles.iconContainer}>
  //         //             <Icon name="qrcode" size={20} color="#fff" style={styles.icon} />
  //         //           </View>
  //         //           <Text style={styles.buttonText}>Scanner le QR code</Text>
  //         //         </View>
  //         //         <View style={styles.dashedLine} />
  //         //       </TouchableOpacity>
  //         //     </LinearGradient> */}
  //         //   </Card>
  //         //   <Card containerStyle={styles.card}>
  //         //     {/* <LinearGradient
  //         //       colors={['#fff265', '#ff5900', '#f5255d']}
  //         //       style={styles.button}
  //         //     >
  //         //       <TouchableOpacity onPress={handleInputPress}>
  //         //         <View style={styles.buttonContent}>
  //         //           <View style={styles.iconContainer}>
  //         //             <Icon name="edit" size={20} color="#fff" style={styles.icon} />
  //         //           </View>
  //         //           <Text style={styles.buttonText}>Entrer le code du ticket</Text>
  //         //         </View>
  //         //         <View style={styles.dashedLine} />
  //         //       </TouchableOpacity>
  //         //     </LinearGradient> */}
  //         //   </Card>
  //         // </View>
  //         <View style={styles.container}>
  //         {showCamera ? (
  //           <CameraScanner
  //             handleBarCodeScanned={handleBarCodeScanned}
  //             handleGoBack={handleCancelPress}
  //           />
  //         ) : showInput ? (
  //           <TicketInput
  //             ticketCode={ticketCode}
  //             handleTicketCodeChange={handleTicketCodeChange}
  //             handleTicketCodeSubmit={handleTicketCodeSubmit}
  //             handleGoBack={handleGoBack}
  //             keyboardType="visible-password"
  //           />
  //         ) : (
  //           <View style={styles.buttonContainer}>
  //             {!isValidTicket && (
  //               <Card containerStyle={styles.card}>
  //                 <TouchableOpacity
  //                   style={styles.button}
  //                   onPress={handleCameraPress}
  //                 >
  //                   <View style={styles.iconContainer}>
  //                     <Icon
  //                       name="qrcode"
  //                       size={30}
  //                       color="#E47B24"
  //                       style={styles.icon}
  //                     />
  //                   </View>
  //                   <Text style={styles.buttonText}>Scanner un QR code</Text>
  //                 </TouchableOpacity>
  //               </Card>
  //             )}
  //             <Card containerStyle={styles.card}>
  //               <TouchableOpacity
  //                 style={styles.button}
  //                 onPress={handleInputPress}
  //               >
  //                 <View style={styles.iconContainer}>
  //                   <Icon
  //                     name="edit"
  //                     size={30}
  //                     color="#E47B24"
  //                     style={styles.icon}
  //                   />
  //                 </View>
  //                 <Text style={styles.buttonText}>
  //                   Entrer le code du ticket
  //                 </Text>
  //               </TouchableOpacity>
  //             </Card>
  //           </View>
  //         )}
  //       </View>
  //       )}

  //     </View>
  //   </View >
  // );
  return (
    <View style={styles.containerParent}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleLogoPress}>
          {/* <Image
            source={require("../../assets/image/logo-v.png")}
            style={styles.logo}
          /> */}
        </TouchableOpacity>

        {!isCardSelected && !showInput && !showCamera && (
          <View>
            {/* <UploadTicket /> */}
          </View>
        )}

        <View style={styles.container}>
          {showCamera ? (
            <CameraScanner
              handleBarCodeScanned={handleBarCodeScanned}
              handleGoBack={handleCancelPress}
            />
          ) : showInput ? (
            <TicketInput
              ticketCode={ticketCode}
              handleTicketCodeChange={handleTicketCodeChange}
              handleTicketCodeSubmit={handleTicketCodeSubmit}
              handleGoBack={handleGoBack}
              keyboardType="visible-password"
            />
          ) : (
            <View style={styles.buttonContainer}>
              {/* {!isValidTicket && (
                <Card containerStyle={styles.card}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleCameraPress}
                  >
                    <View style={styles.iconContainer}>
                      <Icon
                        name="qrcode"
                        size={30}
                        color="#E47B24"
                        style={styles.icon}
                      />
                    </View>

                    <Text style={styles.buttonText}>Scanner un QR code</Text>
                  </TouchableOpacity>
                </Card>
              )} */}
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  containerParent: {
    flex: 1,
    // backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    justifyContent: "center",
    flexDirection: "column",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
  },
  logo: {
    position: "absolute",
    top: 60,
    left: 20,
    width: 60,
    height: 60,
    flexDirection: "colum",
    // backgroundColor: "#FAF9F7",
  },
  buttonContainer: {
    flexDirection: "column",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  button: {
    backgroundColor: "#FAF9F7",
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
    // backgroundImage: 'linear-gradient(135deg, #fff265, #ff5900, #f5255d)',
    // backgroundColor: 'linear-gradient(135deg, #fff265, #ff5900, #f5255d)',
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 17,
    // fontFamily: "MuseoSans_500",
  },
  dashedLine: {
    position: "absolute",
    left: "100%",
    top: "50%",
    transform: [{ translateY: -50 }],
    width: 2,
    height: "100%",
    borderRightWidth: 2,
    borderRightColor: "rgba(255, 255, 255, 0.5)",
    opacity: 0.5,
  },
  iconContainer: {
    marginRight: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginRight: 5,
  },
  card: {
    width: "90%",
    borderRadius: 10,
    justifyContent: "center",
    borderColor: "#fff",
    borderWidth: 1,
    backgroundColor: "#FAF9F7",
    shadowColor: "#000", // Couleur de l'ombre
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});