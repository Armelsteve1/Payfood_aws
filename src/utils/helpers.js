import { Alert } from 'react-native'
import { STRIPE_API_URL } from '../component/configs/apiEndpoints'

export const getAllCartFoods = (items) => {
    let allFoods = []
    items.forEach(item => item.foods.forEach(food => allFoods.push(food)))
    return allFoods
}

export const getTotalCartItemPrice = (items) => {
    let total = 0
    items.forEach(item => item.foods.forEach(food => total += food.price))
    return total.toFixed(1)
}

export const fetchPublishableKey = async () => {
    try {
        const response = await fetch(`${STRIPE_API_URL}/stripe-key`)
        const { publishableKey } = await response.json()
        return publishableKey
    } catch (e) {
        console.warn('Unable to fetch publishable key. Is your server running?')
        Alert.alert('Error', 'Unable to fetch publishable key. Is your server running?')
        return null
    }
}
