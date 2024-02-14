import { Alert } from 'react-native'
import { STRIPE_API_URL } from '../component/configs/apiEndpoints'

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
