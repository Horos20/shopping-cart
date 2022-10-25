import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

export default function Navbar( {navigation} ) {
  return (
    <View style={{flexDirection: "row"}} >
        <View style={{padding: 6}}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image
              source={require('../assets/menu.png')}
              style={{ width: 50, height: 50 }}
              />
          </TouchableOpacity>
        </View>
        <View style={{marginLeft: 'auto', padding: 6}}>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Image
              source={require('../assets/cart.png')}
              style={{ width: 50, height: 50 }}
            />
          </TouchableOpacity>
        </View>
    </View>
  )
}
