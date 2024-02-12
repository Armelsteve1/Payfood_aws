import { StyleSheet, View } from 'react-native';
import AppNavigation from './src/navigation/appNavigation';
import { Amplify } from 'aws-amplify';
import config from './src/aws-exports';
Amplify.configure(config)


export default function App() {
  
  return (
    <View style={styles.container}>
         <AppNavigation/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

   