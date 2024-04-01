import { View, Text, StyleSheet, Image,} from 'react-native';
import colors from '../../src/component/configs/colors';
import AppHead from '../component/AppHead';
import Screen from '../component/Screen';
import tailwind from 'tailwind-react-native-classnames';

const MonRestaurantScreen = () => {
    return (
        <>
        <Screen style={tailwind`flex-1 bg-white`}>
         <AppHead title={`Mon Restaurant`} icon="person-outline" />    
            <Image style={styles.logo} source={require('../assets/logo.png')} />
            <View style={styles.wrapper}>
                <Text >
                    Indisponible
                </Text>
            </View>
        </Screen>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        justifyContent: 'center',
    },
    logo: {
        alignSelf: 'center',
        top: -200,
    },
    wrapper: {
        paddingHorizontal: 20,
    }
});

export default MonRestaurantScreen;
