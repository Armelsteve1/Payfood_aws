import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const CreatedRestaurant = () => {
    const [restaurantData, setRestaurantData] = useState({
        id: generateId(),
        categories: [],
        coordinates: { latitude: '', longitude: '' },
        image_url: '',
        menu_id: '',
        name: '',
        price: '',
        rating: '',
        reviews: '',
        review_count: '',
        time: '',
    });

    const handleChange = (key, value) => {
        setRestaurantData({ ...restaurantData, [key]: value });
    };

    const handleSubmit = () => {
        fetch('https://arf3k5x9o1.execute-api.eu-north-1.amazonaws.com/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(restaurantData),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Réponse du serveur:', data);
                // Réinitialiser le formulaire après la création du restaurant
                setRestaurantData({
                    id: generateId(), // Générer un nouvel ID pour le prochain restaurant
                    categories: [],
                    coordinates: { latitude: '', longitude: '' },
                    image_url: '',
                    menu_id: '',
                    name: '',
                    price: '',
                    rating: '',
                    reviews: '',
                    review_count: '',
                    time: '',
                });
            })
            .catch(error => {
                console.error('Erreur:', error);
            });
    };

    // Fonction pour générer l'ID du restaurant
    function generateId() {
        return 'rest' + Math.random().toString(36).substr(2, 5);
    }

    return (
        <ScrollView>
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nom du restaurant"
                value={restaurantData.name}
                onChangeText={text => handleChange('name', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Catégories (séparées par des virgules)"
                value={restaurantData.categories.join(',')}
                onChangeText={text => handleChange('categories', text.split(','))}
            />
            <TextInput
                style={styles.input}
                placeholder="Latitude"
                value={restaurantData.coordinates.latitude}
                onChangeText={text => handleChange('coordinates', { ...restaurantData.coordinates, latitude: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Longitude"
                value={restaurantData.coordinates.longitude}
                onChangeText={text => handleChange('coordinates', { ...restaurantData.coordinates, longitude: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="URL de l'image"
                value={restaurantData.image_url}
                onChangeText={text => handleChange('image_url', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="ID du menu"
                value={restaurantData.menu_id}
                onChangeText={text => handleChange('menu_id', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Prix"
                value={restaurantData.price}
                onChangeText={text => handleChange('price', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Note"
                value={restaurantData.rating}
                onChangeText={text => handleChange('rating', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Nombre d'avis"
                value={restaurantData.review_count}
                onChangeText={text => handleChange('review_count', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Horaires"
                value={restaurantData.time}
                onChangeText={text => handleChange('time', text)}
            />
            <Button title="Créer le restaurant" onPress={handleSubmit} />
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '100%',
    },
});

export default CreatedRestaurant;