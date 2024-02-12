import React from 'react';
import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native';
import colors from '../component/configs/colors';
import AppButton from '../component/AppButton';

function JoinScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../assets/homePage.png")}
                style={styles.image}
            >
                <Image style={styles.logo} source={require("../assets/logo.png")} />
                <View style={styles.content}>
                    <Text style={styles.title}>Payfood</Text>
                    <Text style={styles.subTitle}>Ne vous préoccupez plus de l’addition.</Text>
                    <AppButton title="Allons-y !" onPress={() => navigation.navigate("SignIn")} />
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        height: 200,
        width: 150,
        resizeMode: 'contain',
        alignSelf: "center",
        position: 'absolute',
        top: 10
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: "contain",
        justifyContent: 'flex-end',
    },
    content: {
        backgroundColor: colors.white,
        paddingHorizontal: 25,
        paddingBottom: 25,
        paddingTop: 35,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 10
    },
    subTitle: {
        fontSize: 16,
        color: colors.gray,
        marginBottom: 10
    },
    input: {
        borderColor: colors.medium,
        backgroundColor: colors.light,
        borderWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 15
    },
});

export default JoinScreen;
