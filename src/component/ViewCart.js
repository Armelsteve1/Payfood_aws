import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import tailwind from 'tailwind-react-native-classnames';

const ViewCart = ({ total ,count}) => {
    const navigation = useNavigation();
    console.log('cont :', count);

    return total > 0 ? (
      <TouchableOpacity
      onPress={() => navigation.navigate("Panier", { total,count })}
      style={[
          tailwind`bg-black absolute bottom-4 self-center py-3 px-12 rounded-full z-50`,
          { backgroundColor: "#FF3C6E" }
      ]}
      >
          <Text style={tailwind`text-white text-sm`}>
              Voir le panier €{total}
          </Text>
      </TouchableOpacity>
  
    ) : null;
}

export default ViewCart;
