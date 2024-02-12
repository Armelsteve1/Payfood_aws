import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import colors from '../component/configs/colors';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import tailwind from 'tailwind-react-native-classnames';
import { Foundation } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import MenuItems from '../component/MenuItems';
import ViewCart from '../component/ViewCart';
import CartItems from '../component/CartItems';
const DetailsScreen = ({ route, navigation }) => {
    const [mapActive, setMapActive] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [getAllItems, setGetAllItems] = useState([]);

    const { coordinates, image_url, name, price, rating, review_count, id, menu_id } = route?.params?.item;

    const handleTotalPrice = (newPrice) => {
        setTotalPrice(newPrice);
    }
    const handleTotalItems = (newItems) => {
        setGetAllItems(newItems);
    }
    console.log('New Items:', getAllItems);
    return (
        <View style={styles.container}>
            <TouchableOpacity style={tailwind`absolute top-9 left-4 z-30 w-9 h-9 rounded-full bg-white justify-center items-center shadow`} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={18} color={colors.black} />
            </TouchableOpacity>
            <View style={styles.mapImageWrapper}>
            {mapActive ? (
                    <RestaurantMap coordinates={coordinates} title={name} />
                ) : (
                    <Image source={{ uri: image_url }} style={styles.image} />
                )}
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={tailwind`z-20`}>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{name}</Text>
                        <TouchableOpacity onPress={() => setMapActive(e => !e)}>
                            <Entypo name="location" size={24} color={`${mapActive ? colors.primary : '#000'}`} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <View style={styles.info}>
                            <View style={styles.infoItem}>
                                <AntDesign name="star" size={12} color="#FFC238" />
                                <Text style={styles.infoText}>{rating} • ({review_count})</Text>
                            </View>
                            <View style={styles.infoItem}>
                                <AntDesign name="clockcircleo" size={10} color={colors.black} />
                                <Text style={styles.infoText}>20-30 min</Text>
                            </View>
                            <View style={styles.infoItem}>
                                <Foundation name="euro" size={16} color={colors.primary} />
                                <Text style={styles.infoText}>• {price}</Text>
                            </View>
                        </View>
                    </View>
                    <MenuItems
                        resName={name}
                        resImage={image_url}
                        id={id}
                        menu_id={menu_id}
                        handleTotalPrice={handleTotalPrice}
                        handleTotalItems={handleTotalItems}
                        setCartItems={CartItems} 
                    />
                </View>
            </ScrollView>
            <ViewCart total={totalPrice} count={getAllItems} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        position: 'relative',
        flex: 1,
    },
    mapImageWrapper: {
        position: 'absolute',
        width: '100%',
    },
    image: {
        width: '100%',
        resizeMode: 'cover',
        height: 260,
    },
    content: {
        position: 'relative',
        zIndex: 20,
        backgroundColor: colors.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 25,
        paddingHorizontal: 25,
        marginTop: 220,
        paddingBottom: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    title: {
        fontSize: 23,
        color: colors.title,
        fontWeight: '700',
        maxWidth: '80%',
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 6,
        paddingVertical: 3,
        backgroundColor: colors.light,
        borderRadius: 5,
        marginRight: 7,
    },
    infoText: {
        marginLeft: 4,
        fontSize: 12,
    },
});

export default DetailsScreen;
